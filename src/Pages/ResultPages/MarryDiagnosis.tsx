import { Typography } from "@material-ui/core";
import * as React from "react";
import "./marry-diagnosis.scss";

export default class MarryDiagnosis extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
    <div style={{width: "100%", fontSize: "11px"}}>
      <Typography variant="h5"
                  style={{ textAlign: "center",
                           marginTop: "10px",
                           marginBottom: "20px"
                  }}
      >
        결혼진단 테스트 결과
      </Typography>

      <Typography variant="subtitle1">
        행복도 그래프
      </Typography>

      <div style={{width: "100%", position: 'relative'}}>
        <div className="bar-chart">
          <div className="self-bar-cont">
            <div style={{height: "50%"}}></div>
          </div>
          <div className="spouse-bar-cont">
            <div style={{height: "70%"}}></div>
          </div>
        </div>
        <table className="md-happy-table">
        <tbody>
          <tr>
            <td>121~145점</td><td>매우 행복</td><td></td><td></td>
          </tr>
          <tr>
            <td>81~120점</td><td>행복</td><td></td><td></td>
          </tr>
          <tr>
            <td>51~80점</td><td>보통</td><td></td><td></td>
          </tr>
          <tr>
            <td>21~50점</td><td>불행</td><td></td><td></td>
          </tr>
          <tr>
            <td>20점 이하</td><td>매우 불행</td><td></td><td></td>
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
      
      
      <Typography variant="subtitle1">
        분석
      </Typography>
      <ul>
        <li>자신이 평가한 점수는 ()점으로 결혼생활을 ()으로 평가함.</li>
        <li>배우자가 평가한 점수는 ()점으로 결혼생활의 행복도가 ()으로 평가함.</li>
        <li>자신과 배우자가 체크한 항목 중 2단계 이상의 차이가 있는 항목:</li>
        <li>3. 여가 및 휴가에 대하여</li>
      </ul>

      <Typography variant="subtitle1">
        나눔
      </Typography>
      
      <p>* 함께 점수를 보고 상호 행복도에 대해 이야기를 나누어 보세요.</p>
      <p>* 자신과 배우자의 차이가 난 항목별로 분석하고 멋진 계획을 세워 보세요.</p>
    
      <Typography variant="subtitle1">
        결과 분석
      </Typography>
      
      <p>최고 점수의 총합은 ()점 입니다.</p>
      <p>☞ 테스트 결과 : 점수의 총합이 120점 이상이면 행복한 결혼, 그이하는 점수가 낮을수록 불행감이 크다는 뜻입니다.</p>

    </div>
    );
  }
}

type res = {
  page_number: number;
  problem_number: number;
  answer: number;
}

type Props = {
  pkgId: string;
  content: {
    page_list: {
      question_list: {
        string_list: string[]
      }[]
    }[];
  };
  result: res[];
  spouseResult: res[];
};