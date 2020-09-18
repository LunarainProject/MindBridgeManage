import { Typography } from "@material-ui/core";
import * as React from "react";
import "./communication.scss";
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
  selfPosTotal: number;
  selfNegTotal: number;
  spousePosTotal: number;
  spouseNegTotal: number;
  selfPosPercent: number;
  selfNegPercent: number;
  spousePosPercent: number;
  spouseNegPercent: number;
  selfPosStatus: string;
  selfNegStatus: string;
  spousePosStatus: string;
  spouseNegStatus: string;
  selfPosWarn: {index: number, desc: string}[],
  selfPosSevere: {index: number, desc: string}[],
  selfNegWarn: {index: number, desc: string}[],
  selfNegSevere: {index: number, desc: string}[],
  spousePosWarn: {index: number, desc: string}[],
  spousePosSevere: {index: number, desc: string}[],
  spouseNegWarn: {index: number, desc: string}[],
  spouseNegSevere: {index: number, desc: string}[],
};

type entry = {
  begin: number;
  end: number;
  desc: string;
};


export default class Communcation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selfPosTotal: 0,
      selfNegTotal: 0,
      spousePosTotal: 0,
      spouseNegTotal: 0,
      selfPosPercent: 0,
      selfNegPercent: 0,
      spousePosPercent: 0,
      spouseNegPercent: 0,
      selfPosStatus: "",
      selfNegStatus: "",
      spousePosStatus: "",
      spouseNegStatus: "",
      selfPosWarn: [],
      selfPosSevere: [],
      selfNegWarn: [],
      selfNegSevere: [],
      spousePosWarn: [],
      spousePosSevere: [],
      spouseNegWarn: [],
      spouseNegSevere: [],
    };
  }
  
  static tablePos = [
    { begin: 0, end: 8, desc: "도움 필요함"  },
    { begin: 9, end: 16, desc: "많은 개선 필요함" },
    { begin: 17, end: 24, desc: "개선 필요함" },
    { begin: 25, end: 32, desc: "좋음" },
    { begin: 33, end: 40, desc: "매우 좋음" },
  ];

  static tableNeg = [
    { begin: 0, end: 13, desc: "매우 좋음" },
    { begin: 14, end: 26, desc: "좋음" },
    { begin: 27, end: 39, desc: "개선 필요함" },
    { begin: 40, end: 52, desc: "많은 개선 필요함" },
    { begin: 53, end: 65, desc: "도움 필요함" }
  ];

  static getDerivedStateFromProps(props: Props, state: State) {
    let result: res[] = [];
    let spouseResult: res[] = [];
    let content = props.content;

    console.log('props: ', props);

    
    // result = props.result ?? [];
    // spouseResult = props.spouseResult ?? [];
    
    /* test result */
    {
      for (var i = 1; i <= 21; i++) {
        for (var j = 1; j <= 2; j++) {
          result.push({
            page_number: i,
            problem_number: j,
            answer: Math.round(Math.random() * 4 + 1),
          });
        }
      }
      for (var i = 1; i <= 21; i++) {
        for (var j = 1; j <= 2; j++) {
          spouseResult.push({
            page_number: i,
            problem_number: j,
            answer: Math.round(Math.random() * 4 + 1),
          });
        }
      }
      content = JSON.parse(
    `{"package_title":"부부 의사 소통 수준 검사","page_list":[{"page_title":"1/21","question_list":[{"question_title":"대화를 나눌 때 경청을 잘한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"2/21","question_list":[{"question_title":"상대방이 마음을 털어놓을 때 이해를 해준다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"3/21","question_list":[{"question_title":"과장시키고 말을 많이 하는 편이다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"4/21","question_list":[{"question_title":"압축하고 말을 너무 적게 하는 편이다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"5/21","question_list":[{"question_title":"감정을 드러내지 않는 편이다.","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"6/21","question_list":[{"question_title":"비판적이거나 잔소리를 해댄다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"7/21","question_list":[{"question_title":"배우자를 격려한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"8/21","question_list":[{"question_title":"충돌이 생기면 그 자리를 피하곤 한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"9/21","question_list":[{"question_title":"상처를 숨기고 분노를 쌓아둔다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"10/21","question_list":[{"question_title":"중간에 끼어들지 않고 배우자의 말을  끝까지 들어준다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"11/21","question_list":[{"question_title":"상대방이 화가 나 있을 때 오랜 시간 동안  말을 하지 않고 지낸다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"12/21","question_list":[{"question_title":"상대방이 화를 낼 것 같은 경우 다른 의견을  내세우는 것을 두려워한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"13/21","question_list":[{"question_title":"일어나는 일들에 대해 대부분의 경우  만족하며 감사를 표한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"14/21","question_list":[{"question_title":"상대방이 자신을 이해해주지 않는다고 불평한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"15/21","question_list":[{"question_title":"화를 내지 않으면서 의견을 달리하는 것이  가능하다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"16/21","question_list":[{"question_title":"대화를 일방적으로 끌고 가곤 한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"17/21","question_list":[{"question_title":"배우자와 성에 대해 자유롭게 대화를 나눈다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"18/21","question_list":[{"question_title":"배우자를 칭찬하며 듣기 좋은 말을 해준다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"19/21","question_list":[{"question_title":"배우자로부터 오해받는 기분을 느낀다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"20/21","question_list":[{"question_title":"감정을 나누는 대화를 피하려는 경향이 있다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]},{"page_title":"21/21","question_list":[{"question_title":"문제가 되는 일들에 대한 대화를 피한다","type":1,"string_list":["항상그렇다","자주 그렇다","때때로 그렇다","드물게 그렇다","거의 그런일이 없다"],"couple_list":["자신","배우자"]}]}]}`
    );
    }

    console.log("result, spouseResult: ", result, spouseResult);

    const resultOnlyAnswer = result.filter((res) => res.problem_number === 1);
    const spouseResultOnlyAnswer = spouseResult.filter(
      (res) => res.problem_number === 1
    );

    const Positive = [1, 2, 7, 10, 13, 15, 17, 18];

    type weight = number[][];
    console.log(weight);
    let selfPos = 0, selfNeg = 0;
    const self = resultOnlyAnswer
      .map(
        (choice: res, index: number) => {
          const row = (weight as weight)[index];
          return row?.[choice.answer - 1] ?? 0
        }
      )
      .forEach((val, index) => {
        if((index+1) in Positive) {
          selfPos += val;
        } else {
          selfNeg += val;
        }
      })
    
    let spousePos = 0, spouseNeg = 0;
    const spouse = spouseResultOnlyAnswer
      .map(
        (choice: res, index: number) => {
          const row = (weight as weight)[index];
          return row?.[choice.answer - 1] ?? 0
        }
      )
      .forEach((val, index) => {
        if((index+1) in Positive) {
          spousePos += val;
        } else {
          spouseNeg += val;
        }
      })

    const percentagePos = (score: number) => percentage(score,
    [
      [0, 0],
      [9, 20],
      [17, 40],
      [25, 60],
      [33, 80],
      [40, 100],
    ]);

    const percentageNeg = (score: number) => percentage(score,
    [
      [0, 0],
      [14, 20],
      [27, 40],
      [40, 60],
      [53, 80],
      [65, 100],       
    ]);

    const percentage = (score: number, correspond: number[][]): number => {
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

    const statusPos = (score: number) => status(score, Communcation.tablePos);

    const statusNeg = (score: number) => status(score, Communcation.tableNeg);

    const status = (score: number, table: entry[]): string => {
      for (let i = 0; i < table.length; i++) {
        if (table[i].begin <= score && score <= table[i].end) {
          return table[i].desc;
        }
      }
      return "";
    };

    console.log('***', resultOnlyAnswer, spouseResultOnlyAnswer);

    let selfPosWarn: {index: number, desc: string}[] = [];
    let selfPosSevere: {index: number, desc: string}[] = [];
    let selfNegWarn: {index: number, desc: string}[] = [];
    let selfNegSevere: {index: number, desc: string}[] = [];
    resultOnlyAnswer.forEach(answer => {
      let elem = {index: answer.page_number, desc: content.page_list[answer.page_number - 1].question_list[0].question_title };
      if(Positive.includes(answer.page_number)) {
         if(answer.answer == 1) {
          selfPosSevere.push(elem);
        } else if (answer.answer <= 3) {
          selfPosWarn.push(elem);
        }
      }
      else {
        if(answer.answer == 5) {
          selfNegSevere.push(elem);
        } else if (answer.answer >= 3) {
          selfNegWarn.push(elem);
        }
      }
    });

    let spousePosWarn: {index: number, desc: string}[] = [];
    let spousePosSevere: {index: number, desc: string}[] = [];
    let spouseNegWarn: {index: number, desc: string}[] = [];
    let spouseNegSevere: {index: number, desc: string}[] = [];
    spouseResultOnlyAnswer.forEach(answer => {
      let elem = {index: answer.page_number, desc: content.page_list[answer.page_number - 1].question_list[0].question_title };
      if(Positive.includes(answer.page_number)) {
         if(answer.answer == 1) {
          spousePosSevere.push(elem);
        } else if (answer.answer <= 3) {
          spousePosWarn.push(elem);
        }
      }
      else {
        if(answer.answer == 5) {
          spouseNegSevere.push(elem);
        } else if (answer.answer >= 3) {
          spouseNegWarn.push(elem);
        }
      }
    });

    return {
      selfPosTotal: selfPos,
      selfNegTotal: selfNeg,
      spousePosTotal: spousePos,
      spouseNegTotal: spouseNeg,
      selfPosPercent: percentagePos(selfPos),
      selfNegPercent: percentageNeg(selfNeg),
      spousePosPercent: percentagePos(spousePos),
      spouseNegPercent: percentageNeg(spouseNeg),
      selfPosStatus: statusPos(selfPos),
      selfNegStatus: statusNeg(selfNeg),
      spousePosStatus: statusPos(spousePos),
      spouseNegStatus: statusNeg(spouseNeg),
      selfPosWarn: selfPosWarn,
      selfPosSevere: selfPosSevere,
      selfNegWarn: selfNegWarn,
      selfNegSevere: selfNegSevere,
      spousePosWarn: spousePosWarn,
      spousePosSevere: spousePosSevere,
      spouseNegWarn: spouseNegWarn,
      spouseNegSevere: spouseNegSevere,
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
          부부 의사소통 검사 결과
        </Typography>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">긍정적인 소통점수 결과 (점수가 높을수록 좋음)</Typography>
        </div>
        <div style={{ width: "100%", position: "relative" }}>
          <div className="bar-chart">
            <div className="self-bar-cont">
              <div style={{ height: `${this.state.selfPosPercent}%` }}></div>
            </div>
            <div className="spouse-bar-cont">
              <div style={{ height: `${this.state.spousePosPercent}%` }}></div>
            </div>
          </div>
          <table className="cm-table">
            <tbody>
              {Communcation.tablePos.slice().reverse().map((val, index) => (
                <tr key={index}>
                  <td>{val.begin}~{val.end}점</td>
                  <td>{val.desc}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td>점수</td>
                <td>만족도</td>
                <td className="graph">자신</td>
                <td className="graph">배우자</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">부정적인 소통점수 결과 (점수가 낮을수록 좋음)</Typography>
        </div>
        <div style={{ width: "100%", position: "relative" }}>
          <div className="bar-chart">
            <div className="self-bar-cont">
              <div style={{ height: `${this.state.selfNegPercent}%` }}></div>
            </div>
            <div className="spouse-bar-cont">
              <div style={{ height: `${this.state.spouseNegPercent}%` }}></div>
            </div>
          </div>
          <table className="cm-table">
            <tbody>
              {Communcation.tableNeg.slice().reverse().map((val, index) => (
                <tr key={index}>
                  <td>{val.begin}~{val.end}점</td>
                  <td>{val.desc}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td>점수</td>
                <td>만족도</td>
                <td className="graph">자신</td>
                <td className="graph">배우자</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">부부의 의사소통 수준 분석</Typography>
        </div>

        <p>
          - 자신의 테스트 분석 -
        </p>

        <ul>
          <li>
            긍정적인 소통 점수는 ({this.state.selfPosTotal})점으로
            ({this.state.selfPosStatus})으로 판정됩니다.
          </li>
          <li>
            부정적인 소통 점수는 ({this.state.selfNegTotal})점으로
            ({this.state.selfNegStatus})으로 판정됩니다.
          </li>
          <li>
            * 긍정적인 항목 중 3점 이하인 항목 ({this.state.selfPosSevere.length + this.state.selfPosWarn.length}개 항목):
            <ul>
              {this.state.selfPosWarn.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
            그 중 1점을 기록한 항목 ({this.state.selfPosSevere.length}개 항목):
            <ul>
              {this.state.selfPosSevere.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
          </li>
          <li>
            3점 이하에 대해서는 노력이 권장되며, 1점을 기록한 항목에 대해서는 전문가의 도움이 필요합니다.
          </li>
          <li>
            * 부정적인 항목 중 3점 이상인 항목 ({this.state.selfNegSevere.length + this.state.selfNegWarn.length}개 항목):
            <ul>
              {this.state.selfNegWarn.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
            그 중 5점을 기록한 항목 ({this.state.selfNegSevere.length}개 항목):
            <ul>
              {this.state.selfNegSevere.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
          </li>
          <li>
            3점 이상에 대해서는 노력이 권장되며, 5점을 기록한 항목에 대해서는 전문가의 도움이 필요합니다.
          </li>
        </ul>

        <p>
          - 배우자의 테스트 분석 -
        </p>

        <ul>
          <li>
            긍정적인 소통 점수는 ({this.state.spousePosTotal})점으로
            ({this.state.spousePosStatus})으로 판정됩니다.
          </li>
          <li>
            부정적인 소통 점수는 ({this.state.spouseNegTotal})점으로
            ({this.state.spouseNegStatus})으로 판정됩니다.
          </li>
          <li>
            * 긍정적인 항목 중 3점 이하인 항목 ({this.state.spousePosSevere.length + this.state.spousePosWarn.length}개 항목):
            <ul>
              {this.state.spousePosWarn.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
            그 중 1점을 기록한 항목 ({this.state.spousePosSevere.length}개 항목):
            <ul>
              {this.state.spousePosSevere.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
          </li>
          <li>
            3점 이하에 대해서는 노력이 권장되며, 1점을 기록한 항목에 대해서는 전문가의 도움이 필요합니다.
          </li>
          <li>
            * 부정적인 항목 중 3점 이상인 항목 ({this.state.spouseNegSevere.length + this.state.spouseNegWarn.length}개 항목):
            <ul>
              {this.state.spouseNegWarn.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
            그 중 5점을 기록한 항목 ({this.state.spouseNegSevere.length}개 항목):
            <ul>
              {this.state.spouseNegSevere.map(val => (
                <li>
                  {val.index}. {val.desc}
                </li>
              ))}
            </ul>
          </li>
          <li>
            3점 이상에 대해서는 노력이 권장되며, 5점을 기록한 항목에 대해서는 전문가의 도움이 필요합니다.
          </li>
        </ul>


        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography variant="subtitle1">나눔</Typography>
        </div>
        <p>* 함께 점수를 보고 상호 행복도에 대해 이야기를 나누어 보세요.</p>
        <p>
          * 자신과 배우자의 점수를 항목별로 분석하고 함께 개선책을 세워 보세요.
        </p>
      </div>
    );
  }
}
