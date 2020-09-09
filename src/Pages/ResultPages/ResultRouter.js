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
import MarryDiagnosis from "./MarryDiagnosis";

export default class ResultRouter extends React.Component {
  constructor(props) {
    super(props);

    /*test*/
    if (this.props.result != [] || this.props.result != undefined || this.props.result != null) {
      this.result = [];
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j <= 2; j++) {
          this.result.push({
            page_number: i,
            problem_number: j,
            answer: (random() * 4 + 1).toFixed(0),
          });
        }
      }
    } else {
      this.result = this.props.result;
    }

    console.log(this.props.pkgId, this.result)
  }

  render() {

    switch (this.props.pkgId) {
      //결혼생활 진단 테스트
      case '50':
          return (
            <MarryDiagnosis
                pkgId={this.props.pkgId}
                content={this.props.content}
                result={Object.values(this.result)}
            ></MarryDiagnosis>
          ) 

      case '27':
        return <div></div>;
      default:
        return (
          <div>
            {this.result.map((value) => (
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
