import { Typography } from "@material-ui/core";
import * as React from "react";
import "./conversation.scss";
import weightMale from "./weightMale.json";
import weightFemale from "./weightFemale.json";

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
  gender: 'male' | 'female';
};

type State = {
  selfTotal: number;
  spouseTotal: number;
  selfPercent: number;
  spousePercent: number;
  selfStatus: string;
  spouseStatus: string;
};

type entry = {
  begin: number;
  end: number;
  desc: string;
};
const table: entry[] = [
  { begin: 0, end: 2, desc: "매우 개선 필요함" },
  { begin: 3, end: 4, desc: "개선 필요함" },
  { begin: 5, end: 6, desc: "노력 필요함" },
  { begin: 7, end: 8, desc: "잘함" },
  { begin: 9, end: 11, desc: "매우 잘함" },
];

export default class Conversation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selfTotal: 0,
      spouseTotal: 0,
      selfPercent: 0,
      spousePercent: 0,
      selfStatus: "",
      spouseStatus: "",
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    let result: res[] = [];
    let spouseResult: res[] = [];
    let content = props.content;

    console.log('props: ', props);

    
    result = props.result ?? [];
    spouseResult = props.spouseResult ?? [];
    

    /* test result */
    // {
    //   for (var i = 1; i <= 11; i++) {
    //     for (var j = 1; j <= 1; j++) {
    //       result.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() + 1),
    //       });
    //     }
    //   }
    //   for (var i = 1; i <= 10; i++) {
    //     for (var j = 1; j <= 2; j++) {
    //       spouseResult.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() + 1),
    //       });
    //     }
    //   }
    //   content = JSON.parse(
    // `{"package_title":"결혼생활진단테스트","page_list":[{"page_title":"결혼생활진단테스트 1/16","question_list":[{"question_title":"결혼에 대해 당신이 느끼는 행복감은?","type":3,"string_list":["최고로 행복하다고 생각한다","행복한 편이라 생각한다","보통이다","불행한 편이라 생각한다","극심하게 불행하다고 생각한다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 2/16","question_list":[{"question_title":"'돈쓰는 문제에 대해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상 어긋난다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 3/16","question_list":[{"question_title":"'여가와 휴가에 대해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상 어긋난다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 4/16","question_list":[{"question_title":"'애정 표시에 관해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상어긋남"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 5/16","question_list":[{"question_title":"'친구나 주변사람에 관해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상어긋남"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 6/16","question_list":[{"question_title":"'섹스에 대해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상어긋남"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 7/16","question_list":[{"question_title":"'가치관과 삶의 우선순위에 대해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상어긋남"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 8/16","question_list":[{"question_title":"'인생관(삶의철학)에 대해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상어긋남"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 9/16","question_list":[{"question_title":"'부모,형제, 친인척에 대해' 배우자와 의견 일치가 얼마나 되는지?","type":3,"string_list":["항상 일치 한다","대부분 일치한다","가끔 일치하거나 어긋난다","대부분 어긋난다","항상어긋남"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 10/16","question_list":[{"question_title":"서로 의견이 어긋날 때","type":3,"string_list":["남편이 진다","아내가 진다","서로 양보하여 타협안을 찾는다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 11/16","question_list":[{"question_title":"당신 부부는 취미나 여가를 함께 합니까?","type":3,"string_list":["모두 같이 한다","일부만 같이 한다","거의 같이 하는 게 없다","아무것도 같이 하지 않는다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 12/16","question_list":[{"question_title":"여가가 있을 때 당신은 대체로","type":3,"string_list":["어딘가 가거나 뭔가를 하려 한다","집에 있고 싶어한다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 13/16","question_list":[{"question_title":"여가가 있을 때 당신의 배우자는 대체로","type":3,"string_list":["어딘가 가거나 뭔가를 하려 한다","집에 있고 싶어한다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 14/16","question_list":[{"question_title":"차라리 독신으로 살았더라면 하는 생각이 든 적이 있습니까?","type":3,"string_list":["종종 그런 생각을 한다","가끔 그런 생각이 든다","별로 그런 생각을 한 적이 없다","한번도 그런 생각을 한 적이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 15/16","question_list":[{"question_title":"만일 다시 태어난다면","type":3,"string_list":["같은 배우자랑 결혼하겠다","다른 사람과 결혼하겠다","결혼을 절대 하지 않겠다"],"couple_list":["자신","배우자"]}]},{"page_title":"결혼생활진단테스트 16/16","question_list":[{"question_title":"배우자를 신뢰합니까?","type":3,"string_list":["거의 믿어본 적이 없다","아주 드물게 믿는다","대부분 믿는다","모든 것을 신뢰한다"],"couple_list":["자신","배우자"]}]}]}`
    // );
    // }

    console.log("result, spouseResult: ", result, spouseResult);

    const resultOnlyAnswer = result.filter((res) => res.problem_number === 1);
    const spouseResultOnlyAnswer = spouseResult.filter(
      (res) => res.problem_number === 1
    );

    type weight = number[][];

    const self = resultOnlyAnswer
      .map(
        (choice: res, index: number) => {
          const row = ((props.gender == 'male' ? weightMale : weightFemale) as weight)[index];
          return row?.[choice.answer - 1] ?? 0
        }
          
      )
      .reduce((acc, cur) => acc + cur, 0);

    const spouse = spouseResultOnlyAnswer
      .map(
        (choice: res, index: number) => {
          const row = ((props.gender == 'male' ? weightFemale : weightMale) as weight)[index];
          return row?.[choice.answer - 1] ?? 0
        }
      )
      .reduce((acc, cur) => acc + cur, 0);

    const percentage = (score: number): number => {
      const correspond = [
        [0, 0],
        [3, 20],
        [5, 40],
        [7, 60],
        [9, 80],
        [11, 100],
      ];
      for (let i = 0; i < correspond.length - 1; i++) {
        const left = correspond[i][0];
        const ly = correspond[i][1];
        const right = correspond[i + 1][0];
        const ry = correspond[i + 1][1];
        if (left <= score && score <= right) {
          const ratio = (score - left) / (right - left);
          return ly + (ry - ly) * ratio;
        }
      }
      return 0;
    };

    const status = (score: number): string => {
      for (let i = 0; i < table.length; i++) {
        if (table[i].begin <= score && score <= table[i].end) {
          return table[i].desc;
        }
      }

      return "";
    };

    return {
      selfTotal: self,
      spouseTotal: spouse,
      selfPercent: percentage(self),
      spousePercent: percentage(spouse),
      selfStatus: status(self),
      spouseStatus: status(spouse),
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
          부부 대화 테스트 결과
        </Typography>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">행복도 그래프</Typography>
        </div>
        <div style={{ width: "100%", position: "relative" }}>
          <div className="bar-chart">
            <div className="self-bar-cont">
              <div style={{ height: `${this.state.selfPercent}%` }}></div>
            </div>
            <div className="spouse-bar-cont">
              <div style={{ height: `${this.state.spousePercent}%` }}></div>
            </div>
          </div>
          <table className="md-happy-table">
            <tbody>
              {table.slice().reverse().map((val, index) => (
                <tr key={index}>
                  <td>{val.begin}~{val.end}점</td>
                  <td>{val.desc}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td>점수</td>
                <td>행복도</td>
                <td className="graph">자신</td>
                <td className="graph">배우자</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">분석</Typography>
        </div>
{/* 
        {this.props.gender == 'male' ?
        (
          <p>
          ☞ 10점이상 점수를 획득했다면 최고의 남편이라고 할 수 있다. 
             남편으로서 이 중에서 몇 가지만이라도 해당되는 것이 있다면 그것만으로도 아내와 바람직한 대화를 나누고 있다고 생각해도 좋다. 안타깝게 어디에도 해당되지 않는다면 
             10개 항목 중에서 무엇이라도 좋으니 바로 할 수 있다고 생각하는 것부터 실천해보라. 
             조금 용기를 내는 것만으로도 아내의 얼굴이 더 밝아지고 더 부드럽게 말을 걸어온다는 사실을 실감할 수 있다. 
        </p>
        ) : (
          <p>
          ☞ 부부간의 대화를 원활하게 하기 위해서는 남편이 조금이라도 말을 하기 편한 분위기를 만드는 아내의 노력이 필요하다.
시집 식구에 대한 불평이나 결혼생활에 대한 불만을 듣게 될 것이 뻔하다고 생각된다면, 일찍 들어갈 수 있는 날에도 다른 데서 시간을 보내다 들어가려는 생각이 들 것이다. 
이야기를 좀 더 나누고 싶다면 먼저 상대방의 마음을 이해해야 하는 것이 기본이다. 그리고 그것은 공감 능력이 뛰어난 여성이 더 많이 가지고 있는 특성이다. 
여성이 가지고 있는 다정함과 배려는 돈으로 얻을 수 없는 가치가 있다. 
        </p>
        )}
         */}

        <ul>
          <li>
            자신이 평가한 점수는 ({this.state.selfTotal})점으로 결혼생활을 (
            {this.state.selfStatus})으로 평가함.
          </li>
          <li>
            배우자가 평가한 점수는 ({this.state.spouseTotal})점으로 결혼생활의
            행복도가 ({this.state.spouseStatus})으로 평가함.
          </li>
        </ul>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">나눔</Typography>
        </div>
        <p>* 함께 점수를 보고 대화 충실도에 대해 이야기를 나누어 보세요.</p>
        <p>
          * 아내와 남편이 각각 체크한 항목별로 분석하고 대화 계획을 세워보세요.
        </p>
      </div>
    );
  }
}
