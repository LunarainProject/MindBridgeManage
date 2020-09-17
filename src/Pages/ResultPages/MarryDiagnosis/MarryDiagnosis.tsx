import { Typography } from "@material-ui/core";
import * as React from "react";
import "./marry-diagnosis.scss";
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
  selfTotal: number;
  spouseTotal: number;
  selfPercent: number;
  spousePercent: number;
  selfStatus: string;
  spouseStatus: string;
  greatDivergence: string[];
};

export default class MarryDiagnosis extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selfTotal: 0,
      spouseTotal: 0,
      selfPercent: 0,
      spousePercent: 0,
      selfStatus: "",
      spouseStatus: "",
      greatDivergence: [],
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    let result: res[] = [];
    let spouseResult: res[] = [];
    let content = props.content;

    console.log('props: ', props);

    
    result = props.result;
    spouseResult = props.spouseResult;
    

    /* test result */
    // {
    //   for (var i = 1; i <= 15; i++) {
    //     for (var j = 1; j <= 2; j++) {
    //       result.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() * 4 + 1),
    //       });
    //     }
    //   }
    //   for (var i = 1; i <= 15; i++) {
    //     for (var j = 1; j <= 2; j++) {
    //       spouseResult.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() * 4 + 1),
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
    console.log(weight);
    const self = resultOnlyAnswer
      .map(
        (choice: res, index: number) => {
          const row = (weight as weight)[index];
          return row?.[choice.answer - 1] ?? 0
        }
          
      )
      .reduce((acc, cur) => acc + cur, 0);

    const spouse = spouseResultOnlyAnswer
      .map(
        (choice: res, index: number) => {
          const row = (weight as weight)[index];
          return row?.[choice.answer - 1] ?? 0
        }
      )
      .reduce((acc, cur) => acc + cur, 0);

    const percentage = (score: number): number => {
      const correspond = [
        [0, 0],
        [20, 20],
        [50, 40],
        [80, 60],
        [120, 80],
        [145, 100],
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
      type entry = {
        begin: number;
        end: number;
        desc: string;
      };
      const table: entry[] = [
        { begin: 0, end: 20, desc: "매우 불행" },
        { begin: 21, end: 50, desc: "불행" },
        { begin: 51, end: 80, desc: "보통" },
        { begin: 81, end: 120, desc: "행복" },
        { begin: 121, end: 145, desc: "매우 행복" },
      ];

      for (let i = 0; i < table.length; i++) {
        if (table[i].begin <= score && score <= table[i].end) {
          return table[i].desc;
        }
      }

      return "";
    };

    const diff: number[] = [];
    for (let i = 0; i < resultOnlyAnswer.length; i++) {
      diff.push(
        Math.abs(resultOnlyAnswer[i].answer - spouseResultOnlyAnswer[i].answer)
      );
    }

    console.log("DIFF: ", diff);
    console.log(content);

    const greatDivergence = diff
      .map((num, index) => ({ num, index }))
      .filter(({ num }) => num >= 2)
      .map(({ index }) => index)
      .map((index) => content.page_list[index].question_list[0].question_title);
    console.log(greatDivergence);

    return {
      selfTotal: self,
      spouseTotal: spouse,
      selfPercent: percentage(self),
      spousePercent: percentage(spouse),
      selfStatus: status(self),
      spouseStatus: status(spouse),
      greatDivergence: greatDivergence,
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
          결혼진단 테스트 결과
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
              <tr>
                <td>121~145점</td>
                <td>매우 행복</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>81~120점</td>
                <td>행복</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>51~80점</td>
                <td>보통</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>21~50점</td>
                <td>불행</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>20점 이하</td>
                <td>매우 불행</td>
                <td></td>
                <td></td>
              </tr>
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

        <p>
          ☞ 테스트 결과 : 점수의 총합이 120점 이상이면 행복한 결혼, 그이하는
          점수가 낮을수록 불행감이 크다는 뜻입니다.
        </p>

        <ul>
          <li>
            자신이 평가한 점수는 ({this.state.selfTotal})점으로 결혼생활을 (
            {this.state.selfStatus})으로 평가함.
          </li>
          <li>
            배우자가 평가한 점수는 ({this.state.spouseTotal})점으로 결혼생활의
            행복도가 ({this.state.spouseStatus})으로 평가함.
          </li>
          <li>
            자신과 배우자가 체크한 항목 중 2단계 이상의 차이가 있는 항목:
            <ul>
              {this.state.greatDivergence.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
        </ul>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">나눔</Typography>
        </div>
        <p>* 함께 점수를 보고 상호 행복도에 대해 이야기를 나누어 보세요.</p>
        <p>
          * 자신과 배우자의 차이가 난 항목별로 분석하고 멋진 계획을 세워 보세요.
        </p>
      </div>
    );
  }
}
