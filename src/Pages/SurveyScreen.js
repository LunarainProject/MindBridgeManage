import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Typography, Chip, Snackbar, Radio, RadioGroup, FormControl } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, ArrowBackIos, ArrowForwardIos, LineWeight } from '@material-ui/icons';
import axios from 'axios';
import queryString from 'query-string';
import ProblemType1 from '../Components/ProblemType1.js';
import ProblemType2 from '../Components/ProblemType2.js';
import ProblemType3 from '../Components/ProblemType3.js';
import ProblemType4 from '../Components/ProblemType4.js';
import NavigationBtn from '../Components/NavigationBtn.js';
import testSurvey from "../survey/test.json";
import '../css/default.css';
import '../css/problem.css';
import { envGetUrl } from '../env.js';


class SurveyScreen extends React.Component {

  ChangeAuto = (content) => {
    let arrayList = new Array();

    arrayList = (content).split("_");

    if (arrayList[3] == "undefined" || arrayList[3] == null) {
      this.state.answer[arrayList[0] + "_" + arrayList[1]] = arrayList[2];
    } else {
      this.state.answer[arrayList[0] + "_" + arrayList[1] + "_" + arrayList[2]] = arrayList[3];
    }
    console.log(this.state.answer);
  }

  handleChange = (e) => {
    let arrayList = new Array();

    console.log(e.target.value + "");
    arrayList = (e.target.value).split("_");

    if (arrayList[3] == "undefined" || arrayList[3] == null) {
      this.state.answer[arrayList[0] + "_" + arrayList[1]] = arrayList[2];
    } else {
      this.state.answer[arrayList[0] + "_" + arrayList[1] + "_" + arrayList[2]] = arrayList[3];
    }
    console.log(this.state.answer);
  }

  state = {
    answer: new Object(),
    content: new Array(),
    contentObj: "",
    count: 0,
    CheckItIsFirst: 0,
    CheckBoxOnCheck: new Array(),
    pkgId: this.props.match.params.pkgSrl,
    UserId: this.props.match.params.id,
    open: false,
    close: true,
    message: "첫 번째 페이지 입니다.",
    complete: false,
  }

  constructor(props) {
    super(props);
    const { match } = this.props;
    console.log("매치" + match);
    this.state.content = '{"package_title":"Mind Bridge Survey Editor","page_list":[]}';
    this.state.contentObj = JSON.parse(this.state.content);
    if (this.state.pkgId == "undefined" || this.state.UserId == "undefined") {
      this.setState({
        pkgId: "1",
        UserId: "IdontknowWhoareYou",
      })
    }
    console.log(this.state.contentObj);
    this.GetDataInServer();
  }

  CountInitialization = () => {
    this.setState({
      CheckItIsFirst: this.state.CheckItIsFirst + 1,
    });
  }

  AnswerInitialization = () => {
    this.state.answer = new Object();
  }

  AnswerObjectInitialization = (abc) => {
    let arrayList = new Array();

    console.log(abc + "");
    arrayList = (abc).split("_");

    if (arrayList[3] == "undefined" || arrayList[3] == null) {
      this.state.answer[arrayList[0] + "_" + arrayList[1]] = 0;
    } else {
      this.state.answer[arrayList[0] + "_" + arrayList[1] + "_" + arrayList[2]] = 0;
    }
  }

  PlushandleClick = () => {
    console.log(JSON.stringify(this.state.answer));
    if (this.state.count == (this.state.contentObj.page_list.length - 1)) {
      axios({
        method: 'post',
        url: 'http://gfs3456.cafe24.com/connectedSheet/upload.php',
        params: {
          pkg_id: this.state.pkgId,
          page_number: "" + (this.state.count + 1),
          access_token: this.state.UserId,
          answer: this.state.answer,
          complete: false,
        },
        header: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }).then(function (response) {
        console.log("response : " + response);
        console.log(response);
      })
        .catch((error) => {
          console.log("error : " + error);
        });
    }
    if (this.state.count < (this.state.contentObj.page_list.length - 1)) {
      this.setState({ count: this.state.count + 1 });
      axios({
        method: 'post',
        url: 'http://gfs3456.cafe24.com/connectedSheet/upload.php',
        params: {
          pkg_id: this.state.pkgId,
          page_number: "" + (this.state.count + 1),
          access_token: this.state.UserId,
          answer: this.state.answer,
          complete: "false",
        },
        header: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }).then(function (response) {
        console.log("response : " + response);
        console.log(response);
      })
        .catch((error) => {
          console.log("error : " + error);
        });
    } else if (this.state.count == (this.state.contentObj.page_list.length - 1)) {
      try {
        window.ReactNativeWebView.postMessage('mindbridge');
      } catch (e) {
        console.log(e);
      }
      this.setState({
        open: true, close: false, message: "마지막 페이지 입니다.",
      })
      setTimeout(() => {
        this.setState({
          open: false, close: true,
        })
      }, 2000)
      axios({
        method: 'post',
        url: 'http://gfs3456.cafe24.com/connectedSheet/upload.php',
        params: {
          pkg_id: this.state.pkgId,
          page_number: "" + (this.state.count + 1),
          access_token: this.state.UserId,
          answer: this.state.answer,
          complete: "true",
        },
        header: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }).then(function (response) {
        console.log("response : " + response);
        console.log(response);
      })
        .catch((error) => {
          console.log("error : " + error);
        });
    }
  }

  MinushandleClick = () => {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 });
    } else if (this.state.count == 0) {
      this.setState({
        open: true, close: false, message: "첫 번째 페이지 입니다."
      })
      setTimeout(() => {
        this.setState({
          open: false, close: true,
        })
      }, 2000)
    }
  }

  GetDataInServer = () => {
    axios({
      method: 'post',
      url: 'http://gfs3456.cafe24.com/connectedSheet/index.php',
      params: {
        pkg_id: this.state.pkgId
      },
      header: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((response) => response.data)
      .then((responseJson) => {
        this.setState({
          content: responseJson
        });
        console.log("responseJson");
        console.log(responseJson);
        this.setState({
          contentObj: responseJson
        });
        console.log(this.state.contentObj);
        this.CountInitialization();
      })
      .catch((error) => {
        this.setState({
          content: testSurvey,
          contentObj: testSurvey,
        })
        console.log("error : " + error);
      });
  }

  CountUp = () => {
    axios({
      method: 'post',
      url: 'http://gfs3456.cafe24.com/connectedSheet/count.php',
      params: {
        pkg_id: this.state.pkgId,
        access_token: this.state.UserId,
      },
      header: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then((response) => response.data)
      .then((responseJson) => {
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  }

  componentDidMount() {
    console.log("pkgSrl : " + this.props.match.params.pkgSrl);
    console.log("id : " + this.props.match.params.id);
    console.log("this.state.PkgId : " + this.state.pkgId);
    console.log("this.state.UserId : " + this.state.UserId);
    this.CountUp();
  }

  render() {
    if (this.state.count != 0) {
      this.AnswerInitialization();
    }
    const CenterStyle = {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
      width: "100vw",
      height: "100vh auto",
      margin: "0px",
      paddingTop: "2vh",
      paddingBottom: "18vh"
    }

    const ChipBox = {
      height: "2vh auto",
      background: "rgb(240,240,240)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100px",
      padding: "5px 10px",
    }

    return (
      <Box>
        <Snackbar className="MuiSnackbarContent-root" style={{ background: "#00000000" }}
          open={this.state.open}
          onClose={this.state.close}
          message={this.state.message}
          key={2}
        />
        <Box style={CenterStyle}>
          <Box boxShadow={1} style={{ ...ChipBox, marginBottom: "5px" }}>
            <Typography variant="h7" onClick={this.AxiosTestVer}>
              {this.state.count + 1} / {this.state.contentObj.page_list.length}
            </Typography>
          </Box>
          {
            this.state.contentObj.page_list.map((val, index) => (
              (index == this.state.count) &&
              val.question_list.map((val2, index2) => (
                (val2.type == 1) ? (
                  <Box>
                    <ProblemType4 coupleList={val2.couple_list} onCreate={this.AnswerObjectInitialization} ChangeAuto={this.ChangeAuto} onChangeHandler={this.handleChange} title={val2.question_title} content={this.state.content} question={val2.string_list} problemnumber={index2} pagenumber={index} />
                  </Box>) : (
                    (val2.type == 2) ? (
                      <Box>
                        <ProblemType2 onCreate={this.AnswerObjectInitialization} onChangeHandler={this.handleChange} title={val2.question_title} question={val2.string_list} problemnumber={index2} pagenumber={index} />
                      </Box>) : (
                        <Box>
                          <ProblemType3 onCreate={this.AnswerObjectInitialization} onChangeHandler={this.handleChange} title={val2.question_title} question={val2.string_list} problemnumber={index2} pagenumber={index} />
                        </Box>)
                  )
              ))

            ))
          }
        </Box>
        <NavigationBtn CountInitialization={this.CountInitialization} CheckObject={this.state.answer} MinusonClickHandler={this.MinushandleClick} PlusonClickHandler={this.PlushandleClick} />
      </Box>
    );
  }
}

export default SurveyScreen;