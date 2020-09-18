import * as React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Typography } from "@material-ui/core";

import "./economy.scss";
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
};

type entry = {
  begin: number;
  end: number;
  desc: string;
};
const table: entry[] = [
  { begin: 0, end: 9, desc: "매우 취약" },
  { begin: 10, end: 14, desc: "개선 필요" },
  { begin: 15, end: 20, desc: "매우 양호" },
];

export default class Economy extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selfTotal: 0,
      spouseTotal: 0,
      selfPercent: 0,
      spousePercent: 0,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    let result: res[] = [];
    let spouseResult: res[] = [];

    result = props.result ?? [];
    spouseResult = props.spouseResult ?? [];

    /* test result */
    // {
    //   for (var i = 1; i <= 20; i++) {
    //     for (var j = 1; j <= 1; j++) {
    //       result.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() + 1),
    //       });
    //     }
    //   }
    //   for (var i = 1; i <= 20; i++) {
    //     for (var j = 1; j <= 1; j++) {
    //       spouseResult.push({
    //         page_number: i,
    //         problem_number: j,
    //         answer: Math.round(Math.random() + 1),
    //       });
    //     }
    //   }
    // }

    const resultOnlyAnswer = result.filter((res) => res.problem_number === 1);
    const spouseResultOnlyAnswer = spouseResult.filter(
      (res) => res.problem_number === 1
    );

    type weight = number[][];
    console.log(weight);
    const self = resultOnlyAnswer
      .map((choice: res, index: number) => {
        const row = (weight as weight)[index];
        return row?.[choice.answer - 1] ?? 0;
      })
      .reduce((acc, cur) => acc + cur, 0);

    const spouse = spouseResultOnlyAnswer
      .map((choice: res, index: number) => {
        const row = (weight as weight)[index];
        return row?.[choice.answer - 1] ?? 0;
      })
      .reduce((acc, cur) => acc + cur, 0);

    const percentage = (score: number): number => {
      const correspond = [
        [0, 0],
        [10, 33],
        [15, 66],
        [20, 100],
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
          부부 존경지수 체크리스트 결과
        </Typography>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">[존경지수 그래프]</Typography>
        </div>

        <div style={{ marginTop: "10px", marginBottom: "30px", position: "relative" }}>
          <div className="rp-bar-chart">
            <div className="self-bar-cont">
              <div style={{width: `${this.state.selfPercent}%`}}></div>
            </div>
            <div className="spouse-bar-cont">
              <div style={{width: `${this.state.spousePercent}%`}}></div>
            </div>
          </div>
          <table className="rp-table">
            <tbody>
              <tr>
                <td rowSpan={2} colSpan={2}>
                  구분
                </td>
                <td colSpan={3}>점수</td>
              </tr>
              <tr>
                {table.map((line, index) => (
                  <td key={index}>
                    {line.begin}~{line.end}점
                  </td>
                ))}
              </tr>
              <tr>
                <td>자신</td>
                <td>({this.state.selfTotal})점</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>배우자</td>
                <td>({this.state.spouseTotal})점</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>분석</td>
                {table.map((line, index) => (
                  <td key={index}>{line.desc}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">[나눔]</Typography>
        </div>
        <p>
          * 항목별 내용을 가지고 서로 이야기를 나눠보세요.
        </p>
        <p>
          * 아내와 남편의 체크 차이를 분석해 보세요.
        </p>
        <p>* 더 나은 가정경제를 위해 멋진 계획을 세워 보세요.</p>
      </div>
    );
  }
}
