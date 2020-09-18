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
import { envGetUrl } from "../../env";
import SexLife from "./SexLife/SexLife";
import Communcation from "./Communication/Communication";
import Conversation from "./Conversation/Conversation";

export default class ResultRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    switch (this.props.pkgId) {
      //결혼생활 진단 테스트
      case '50':
        return (
          <MarryDiagnosis
            pkgId={this.props.pkgId}
            content={this.props.content}
            result={this.props.result}
            spouseResult={this.props.spouseResult}
          ></MarryDiagnosis>
        );

      case '51':
        return (
          <SexLife
            pkgId={this.props.pkgId}
            content={this.props.content}
            result={this.props.result}
            spouseResult={this.props.spouseResult}
          ></SexLife>
        );

      case '55':
        return (
          <Communcation
            pkgId={this.props.pkgId}
            content={this.props.content}
            result={this.props.result}
            spouseResult={this.props.spouseResult}
          ></Communcation>
        );

      
      case '60':
        return (
          <Conversation
            pkgId={this.props.pkgId}
            content={this.props.content}
            result={this.props.result}
            spouseResult={this.props.spouseResult}
            gender="male"
          ></Conversation>
        );

      case '61':
        return (
          <Conversation
            pkgId={this.props.pkgId}
            content={this.props.content}
            result={this.props.result}
            spouseResult={this.props.spouseResult}
            gender="female"
          ></Conversation>
        );

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
