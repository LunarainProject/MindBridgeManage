import { Typography } from "@material-ui/core";
import * as React from "react";
import "./love-lang.scss";
import weight from "./weight.json";

type res = {
  page_number: number;
  problem_number: number;
  answer: number;
};

type Props = {
  pkgId: string;
  content: {
    page_list: {
      page_title: string;
      question_list: {
        question_title: string;
        string_list: string[];
      }[];
    }[];
  };
  result: res[];
  spouseResult: res[];
};

type State = {
  selfCount: Count, 
  spouseCount: Count,
  selfLang: LangTuple[],
  spouseLang: LangTuple[],
};

type Count = {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
};

type LangTuple = {
  name: string,
  desc: string,
  desc2: string,
}

type Sorted = {
  code: keyof Count;
  value: number;
};

const lang = {
  A: {
    name: "인정하는 말",
    desc: "상대에 대한 칭찬과 격려",
    desc2: "다른 사람을 인정하는 말로 사랑을 표현하는 것입니다. 상대방의 성격이나 외모 또는 그가 당신이나 다른 사람들을 위해 한 일에 초점을 맞춘 말일 수도 있습니다. 이 언어로 말하려면 감사하거나 존중할 만한 면을 상대에게서 살핀 후 그것을 말로 표현하는 것입니다.",
  },
  B: {
    name: "함께하는 시간",
    desc: "진정한 대화, 취미 활동",
    desc2: "이는 상대방에게 집중하는 시간을 가리킵니다. TV를 끄고, 탁자에 놓인 잡지도 치우고, 서로를 바라보며 대화하는 것입니다. 운동을 위해거사 아니가 함께하는 시간을 갖기 위해 산책할 수도 있습니다. 다른 어떤 것보다 함께하는 시간을 가질 때 사랑받는다고 느끼는 사람들이 있습니다.",
  },
  C: {
    name: "선물",
    desc: "가장 배우기 쉬운 사랑의 언어",
    desc2: "어떤 사람들은 선물을 받을 때 자신이 사랑받고 있음을 가장 많이 느낍니다. 선물을 받으면 \"나를 무척 생각하고 있구나\" 라고 생각합니다. 최상의 선물은 상대방이 고맙게 여길 만한 것입니다. 선물이 꼭 비싸야 하는것은 절대 아니죠. 장미 한송이, 막대사탕, 엽서, 한 권의 책 등으로도 사랑을 깊이 있게 전할 수있습니다.",
  },
  D: {
    name: "봉사",
    desc: "원하는 것을 몸으로 봉사해주기",
    desc2: "이런 사람들에게는 말보다 행동이 더 중요합니다. 만일 당신이 그들에게 \"당신은 대단해요\", \"고마워요\", \"사랑해요\"라며 인정하는 말을 하면 그들은 \"당신이 나를 사랑한다면 집안일을 좀 도와주는 게 어떻겠어요?\"하고 생각할 것입니다. 만일 봉사가 그들의 주된 사랑의 언어라면 그들을 사랑하는 비결은 그들이 해주기를 바라는 일을 찾아내고, 그 일을 꾸준히 하는 것입니다.",
  },
  E: {
    name: "스킨십",
    desc: "육체적 접촉을 통한 교감 증대",
    desc2: "스킨십의 정서적인 힘에 대해서는 대부분 잘 알고 있을 것입니다. 연구에 의하면, 오랫동안 스킨십을 하지 않은 아기들 보단 껴안거나 어루만지는 손길을 많이 받은 아기들이 정서적으로 더 양호합니다. 스킨십이 주된 사랑의 언어인 사람에게는 적절한 접촉이 가장 깊이 있는 사랑 표현 방법입니다.",
  },
};

class LangManager {

  private json: string[][] = [];
  private answer: number[] | null = null;
  private count: Count = {
    A: 0, B: 0, C: 0, D: 0, E: 0
  };
  private sorted: Sorted[] = [];

  constructor() {
    this.json = weight;
  }

  public registerAnswer(answer: number[]) {
    
    if(answer.length !== 30) {
      return;
    }
    
    this.answer = answer;
    this.json.forEach((arr, ind) => {
      this.count[(arr[(this.answer as number[])[ind] - 1] as keyof Count)]++;
    });
  }

  public getCount(): Count | null {
    if(this.answer !== null) return this.count;
    else return null;
  }

  public getSortedArray(): Sorted[] | null {
    if(this.sorted.length) return this.sorted;

    const count = this.getCount();
    if(count === null) return null;

    this.sorted = Object.keys(count).map(key => ({
      code: (key as keyof Count),
      value: count[(key as keyof Count)],
    })).sort(function (a, b) { return b.value - a.value; });
    return this.sorted;
  }

  public getSortedLang(): LangTuple[] | null {
    const sorted = this.getSortedArray();

    if(sorted === null) return null;

    if(Object.values(this.count).every(val => val === 0)) {
      return Array.from({length: 5}, () => ({name: '-', desc: '-', desc2: '-'}));
    } else {
      console.log(this.count);
    }

    return sorted.map(val => lang[val.code]);
  }
}

export default class LoveLang extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);

    this.state = {
      selfCount: {A: 0, B: 0, C: 0, D: 0, E: 0},
      spouseCount: {A: 0, B: 0, C: 0, D: 0, E: 0},
      selfLang: Array.from({length: 5}, () => ({name: '-', desc: '-', desc2: '-'})),
      spouseLang: Array.from({length: 5}, () => ({name: '-', desc: '-', desc2: '-'})),
    };
  }

  static getDerivedStateFromProps(props: Props, state: State): State {
    let result: res[] = [];
    let spouseResult: res[] = [];
    let content = props.content;
    
    result = props.result ?? [];
    spouseResult = props.spouseResult ?? [];
    
    /* test result */
    // {
    //   for (var i = 1; i <= 6; i++) {
    //     for (var j = 1; j <= 5; j++) {
    //       result.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() * 1 + 1),
    //       });
    //     }
    //   }
    //   for (var i = 1; i <= 6; i++) {
    //     for (var j = 1; j <= 5; j++) {
    //       spouseResult.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() * 1 + 1),
    //       });
    //     }
    //   }
    // }

    const resultOnlyAnswer = result;
    const spouseResultOnlyAnswer = spouseResult;
    
    const self = new LangManager();
    const spouse = new LangManager();
    
    self.registerAnswer(resultOnlyAnswer.map(val => val.answer));
    spouse.registerAnswer(spouseResultOnlyAnswer.map(val => val.answer));

    return {
      selfCount: self.getCount() ?? state.selfCount,
      spouseCount: spouse.getCount() ?? state.spouseCount,
      selfLang: self.getSortedLang() ?? state.selfLang,
      spouseLang: spouse.getSortedLang() ?? state.spouseLang,
    };
  }

  render() {
    return (
      <div style={{ width: "100%", fontSize: "11px" }}>
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          5가지 사랑의 언어 테스트 결과
        </Typography>

        <p>
          ♥ 자신이 체크한 곳의 알파벳이 각각 몇 개인지 세어보세요.  가장 많이 나온 숫자가 당신의 언어입니다.
        </p>

        <table className="ll-table">
          <tbody>
            <tr>
              <td colSpan={2}>
                  <Typography variant="subtitle1">자신의 “사랑의언어”는?</Typography>
              </td>
            </tr>
            <tr>
              <td>
                제 1 언어 : {this.state.selfLang[0].name}
              </td>
              <td>
                제 2 언어 : {this.state.selfLang[1].name}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                  <Typography variant="subtitle1">배우자의 “사랑의언어”는?</Typography>
              </td>
            </tr>
            <tr>
              <td>
                제 1 언어 : {this.state.spouseLang[0].name}
              </td>
              <td>
                제 2 언어 : {this.state.spouseLang[1].name}
              </td>
            </tr>
          </tbody>
        </table>  

        <p>
        어떤 사랑의 언어의 점수가 가장 높게나왔는가? 그것이 나와 배우자의 주된 사랑의 언어이다. 두 언어의 합계가 같다면 당신은 "2중언어 사용자" 이고 주된 사랑의 언어가 두개라는 뜻이다. 주된 사랑의 언어 다음으로 점수가 높게 나온 제2의 사랑의 언어도 사랑을 표현하는 중요한 도구가 된다. 한 가지 사랑의 언어의 최고점은 12점이다.
        </p>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">분석</Typography>
        </div>

        <table className="ll-test-table"> 
          <tbody>
            <tr>
              <th rowSpan={6}>
                <div>나의 사랑의 언어</div>
                <div>테스트 결과</div>
              </th>
              <td></td>
              <td></td>
            </tr>
            {Array.from("ABCDE").map(key => (
              <tr key={key}>
                <td>{key} {lang[key as keyof Count].name} ({lang[key as keyof Count].desc})</td>
                <td>{this.state.selfCount[key as keyof Count]}개</td>
              </tr>
            ))}
            <tr>
              <th rowSpan={6}>
                <div>배우자의 사랑의</div>
                <div>언어 테스트 결과 </div>
              </th>
              <td></td>
              <td></td>
            </tr>
            {Array.from("ABCDE").map(key => (
              <tr key={key}>
                <td>{key} {lang[key as keyof Count].name} ({lang[key as keyof Count].desc})</td>
                <td>{this.state.spouseCount[key as keyof Count]}개</td>
              </tr>
            ))}
          </tbody>
          </table>

        <p>
        특정한 사랑의 언어가 다른 것들보다 높게 나왔다고 해서 다른 언어들을 무시해서는 안 된다. 사랑하는 사람이 그 언어들을 가지고 사랑을 표현할 수도 있기 때문이다. 그러나 사랑하는 사람이 서로의 언어를 알고, 사랑으로 받아들이는 방식으로 애정을 표현한다면 유익할 것이다. 서로의 사랑의 언어로 말할 때마다 사랑의 점수가 점점 더 높아지게 된다. 상대방의 사랑의 언어로 말할 때 나타나는 결과는 "이 사람이 나를 이해하고 아끼는구나." 라는 느낌에 가깝다. 시간이 지나면 이러한 느낌이 커지면서 더욱 강한 유대감이 생겨난다.
        </p>
        <p>
        상대방의 사랑의 언어를 알아내고 구사하면 관계가 돈독해지는 반면, 그것을 소홀히 할 때는 사랑하는 사람이 사랑 받지 못한다고 느끼게 된다. 사람들이 사랑으로 느끼는 방식으로 사랑을 전하지 않으면, 제아무리 진실한 사랑의 노력이 있다 해도 열매를 맺지 못한다. 이렇게 되면 사랑을 주는 쪽이나 받는 쪽 모두 답답해진다. 자기도 모르는 사이 사랑하는 사람에게 "낯선" 사랑의 언어로 말한 적이 있을지도 모른다. 사랑의 언어의 개념을 이해하면 상대방에게 당신의 감정이 제대로 전달될 수 있도록 효과적으로 표현하게 될 것이다.
        </p>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">나눔</Typography>
        </div>
        <p>
        ☞ 배우자와 나의 사랑의 언어를 가지고 아래 내용을 참고해 보면서 서로 대화를 나누어 보세요.
        </p>

        {Array.from("ABCDE").map(key => (
          <div key={key} style={{marginBottom: "30px"}}>
            <div style={{ marginTop: "5px", marginBottom: "5px" }}>
              <Typography variant="subtitle2">{key}: {lang[key as keyof Count].name} ({lang[key as keyof Count].desc})</Typography>
            </div>
            <table className="ll-r-table">
              <tbody>
                <tr>
                  <td>
                    자신의 사랑의 언어 테스트 결과 - "{lang[key as keyof Count].name}" 선택 항목 수
                  </td>
                  <td>
                    {this.state.selfCount[key as keyof Count]}개
                  </td>
                </tr>
                <tr>
                  <td>
                    배우자의 사랑의 언어 테스트 결과 - "{lang[key as keyof Count].name}" 선택 항목 수
                  </td>
                  <td>
                    {this.state.spouseCount[key as keyof Count]}개
                  </td>
                </tr>
              </tbody>
            </table>

            <p>
              {lang[key as keyof Count].desc2}
            </p>
          </div>
        ))}

      </div>
    );
  }
}
