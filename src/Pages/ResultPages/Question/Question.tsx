import { Typography } from "@material-ui/core";
import * as React from "react";

import "./question.scss";

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
  selfChecked: number[];
  selfUnchecked: number[];
};

export default class Question extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selfChecked: [],
      selfUnchecked: [],
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    let result: res[] = [];

    result = props.result ?? [];

    /* test result */
    // {
    //   for (var i = 1; i <= 67; i++) {
    //     for (var j = 1; j <= 1; j++) {
    //       result.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() + 1),
    //       });
    //     }
    //   }
    // }

    const numProblems = [7, 7, 13, 19, 3, 7, 5, 6];

    let category = 0;
    let count = 0;

    const resultOnlyAnswer = result.filter((res) => res.problem_number === 1);

    let checked = [0, 0, 0, 0, 0, 0, 0, 0];
    let unchecked = [0, 0, 0, 0, 0, 0, 0, 0];
    resultOnlyAnswer.forEach((val, index) => {
      if (val.answer === 1) {
        checked[category] += 1;
      } else {
        unchecked[category] += 1;
      }
      count += 1;

      if (count >= numProblems[category]) {
        count = 0;
        category++;
      }
    });

    console.log(checked, unchecked);

    return {
      selfChecked: checked,
      selfUnchecked: unchecked,
    };
  }

  /**
   * 경제, 부모, 대화, 가정생활, 건강, 성, 종교, 직업
   */

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
          '결혼 전 꼭 해야 할 질문들' 결과
        </Typography>

        <table className="ques-table">
          <tbody>
            <tr>
              <th rowSpan={3}>서로 나눈 주제의 항목 수</th>
              <td>경제</td>
              <td>{this.state.selfChecked[0]}</td>
              <td>부모</td>
              <td>{this.state.selfChecked[1]}</td>
              <td>대화</td>
              <td>{this.state.selfChecked[2]}</td>
            </tr>
            <tr>
              <td>가정생활</td>
              <td>{this.state.selfChecked[3]}</td>
              <td>건강</td>
              <td>{this.state.selfChecked[4]}</td>
              <td>성</td>
              <td>{this.state.selfChecked[5]}</td>
            </tr>
            <tr>
              <td>종교</td>
              <td>{this.state.selfChecked[6]}</td>
              <td>직업</td>
              <td>{this.state.selfChecked[7]}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th rowSpan={3}>아직 나누지 못한 주제 항목 수</th>
              <td>경제</td>
              <td>{this.state.selfUnchecked[0]}</td>
              <td>부모</td>
              <td>{this.state.selfUnchecked[1]}</td>
              <td>대화</td>
              <td>{this.state.selfUnchecked[2]}</td>
            </tr>
            <tr>
              <td>가정생활</td>
              <td>{this.state.selfUnchecked[3]}</td>
              <td>건강</td>
              <td>{this.state.selfUnchecked[4]}</td>
              <td>성</td>
              <td>{this.state.selfUnchecked[5]}</td>
            </tr>
            <tr>
              <td>종교</td>
              <td>{this.state.selfUnchecked[6]}</td>
              <td>직업</td>
              <td>{this.state.selfUnchecked[7]}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">[나눔]</Typography>
        </div>
        <p>* 위의 주제에 대해 서로 대화해 보세요.</p>
        <p>* 아직 나누지 못한 주제에 대한 나눔 일정을 세워보세요.</p>
        <p>* 각 항목에 대한 계획을 세워보세요.</p>
      </div>
    );
  }
}
