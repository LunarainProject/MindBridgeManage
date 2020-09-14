import * as React from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { random } from "math";
import MarryDiagnosis from "./MarryDiagnosis/MarryDiagnosis";

export default class ResultRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      spouseResult: [],
    }

    this.result = [];
    this.spouseResult = [];
  }

  async componentDidMount() {
    console.log('initial state: ', this.props.result);
    /*test result data*/
    if ((this.props.result || []).length == 0) {
      for (var i = 1; i < 15; i++) {
        for (var j = 1; j <= 1; j++) {
          this.result.push({
            page_number: i,
            problem_number: j,
            answer: (random() * 4 + 1).toFixed(0),
          });
        }
      }
      console.log(this.result);
    } else {
      this.result = Object.values(this.props.result);
    }

    /*test spouse data*/
    let response;
    let couple = false;
    try {
      response = await fetch(`http://gfs3456.cafe24.com/api/CheckCouple.php?pkg_id=${this.props.pkgId}`);
    } catch (e) {
      console.log('fetch error: ', e);

      couple = true;
    }

    let responseJson;
    try {
      responseJson = await response?.json() ?? {};
    } catch(e) {
      console.log('json parse error: ', e);
    }

    // coupled survey 일 경우
    if(responseJson?.couple == 'true' || couple) {
      let response;
      let spouse = [];
      try {
        response = await fetch(`http://gfs3456.cafe24.com/api/partnerTestResult2.php?access_token=${this.props.user_srl}&pkg_id=${this.props.pkgId}&count=${this.props.partnerCount}`)
      } catch(e) {
        console.log('fetch error: ', e);
      }
      try {
        spouse = response?.json() ?? [];
      } catch(e) {
        console.log('json parse error', e);
      }

      /* test data */
      if ((spouse || []).length == 0) {
        for (var i = 1; i < 15; i++) {
          for (var j = 1; j <= 1; j++) {
            this.spouseResult.push({
              page_number: i,
              problem_number: j,
              answer: (random() * 4 + 1).toFixed(0),
            });
          }
        }
      } else {
        this.spouseResult = spouse.map(val => ({
          page_number: parseInt(val.page_number),
          problem_number: parseInt(val.problem_number),
          answer: parseInt(val.answer)
        }));
      }
    }

    this.setState({
      result: this.result,
      spouseResult: this.spouseResult,
    })
    console.log(this.props.pkgId, this.result, this.spouseResult)
  }

  render() {

    switch (this.props.pkgId) {
      //결혼생활 진단 테스트
      case '50':
          return (
            <MarryDiagnosis
                pkgId={this.props.pkgId}
                content={this.props.content}
                result={this.state.result}
                spouseResult={this.state.spouseResult}
            ></MarryDiagnosis>
          ) 

      case '27':
        return <div></div>;
      default:
        return (
          <div>
            {this.state.result.map((value) => (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "30px",
                }}
              >
                <Typography>page : {value.page_number}</Typography>
                <Typography>problem : {value.problem_number}</Typography>
                <Typography>answer : {value.answer}</Typography>
              </Box>
            ))}
          </div>
        );
    }
  }
}
