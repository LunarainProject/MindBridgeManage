import React, { Component } from "react";
import { Button, Box, Container, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from "react-router-dom";
import axios from "axios";
import Iframe from "react-iframe";
import mdTest from "../md/1.md";
import StartPageMain from "../Components/StartPageMain";
import StartPageSub from "../Components/StartPageSub";
import testJson from "../survey/test.json";
import discJson from "../survey/disc.json";
import { abs } from "math";
import Chart from "../disc/Chart";
import DiscDataManage from "../disc/disc";
import { Table } from "material-ui";

import "../css/couple-res.css";
import { envGetUrl } from "../env";

import contentJson from "../sample/content.json";

import sampleResult1 from "../sample/1.json";
import sampleResult2 from "../sample/2.json";

const BodyStyle = { width: "100%", height: "100% auto" };
const ReactMarkDown = require("react-markdown");

class CoupleResult extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  state = {
    result: sampleResult1,
    partnerResult: sampleResult2,
    width: 0,
    height: 0,
    husbandDISC: new Object(),
    wifeDISC: new Object(),
    phusbandDISC: new Object(),
    pwifeDISC: new Object(),
    page: 1,
  };

  onNextClick = () => {
    if (this.state.page != 5) {
      this.setState({
        page: this.state.page + 1,
      })
    }
  }

  onPreviousClick = () => {
    if (this.state.page != 1) {
      this.setState({
        page: this.state.page - 1,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    axios({
      method: "post",
      url: envGetUrl() + "/api/partnerTestResult.php",
      params: {
        access_token: this.props.user_srl,
        count: this.props.partnerCount,
      },
      header: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((response) => response.data)
      .then((responseJson) => {
        console.log("responseJson : " + responseJson);
        this.setState({
          partnerResult: responseJson,
        });
      })
      .catch((error) => {
        this.setState({
          partnerResult: sampleResult1,
        });
        console.log("error : " + error);
      });
  }

  render() {
    const numberBox = {
      width: "12%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      border: "1px black solid",
      boxSizing: "border-box",
    };
    const contentBox = {
      width: "22%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      border: "1px black solid",
      boxSizing: "border-box",
      alignItems: "center",
    };
    const colorA = { background: "#CAE5FA" };
    const colorB = { background: "#D8F0C0" };
    const colorC = { background: "#FCFAD9" };

    //const { content = sampleResult2, result = sampleResult2 } = this.props;

    const content = contentJson, result = sampleResult2;

    let husband = new Array(),
      wife = new Array(),
      preference = new Array();
    let husbandDISC = { D: 0, I: 0, S: 0, C: 0 },
      wifeDISC = { D: 0, I: 0, S: 0, C: 0 };
    let phusband = new Array(),
      pwife = new Array(),
      ppreference = new Array();
    let phusbandDISC = { D: 0, I: 0, S: 0, C: 0 },
      pwifeDISC = { D: 0, I: 0, S: 0, C: 0 };

    Object.values(result).map((val, index) =>
      val.gender == 1
        ? (husband[val.page_number - 1] = val.answer)
        : val.gender == 2
          ? (wife[val.page_number - 1] = val.answer)
          : (preference[val.page_number - 1] = val.answer)
    );

    husband
      .map((val, index) => [" ABCD"[val], discJson[index]])
      .map(([answer, map2]) => map2.indexOf(answer))
      .forEach((idx) => husbandDISC["DISC"[idx]]++);

    wife
      .map((val, index) => [" ABCD"[val], discJson[index]])
      .map(([answer, map2]) => map2.indexOf(answer))
      .forEach((idx) => wifeDISC["DISC"[idx]]++);

    Object.values(this.state.partnerResult).map((val, index) =>
      val.gender == 1
        ? (phusband[val.page_number - 1] = val.answer)
        : val.gender == 2
          ? (pwife[val.page_number - 1] = val.answer)
          : (ppreference[val.page_number - 1] = val.answer)
    );

    phusband
      .map((val, index) => [" ABCD"[val], discJson[index]])
      .map(([answer, map2]) => map2.indexOf(answer))
      .forEach((idx) => phusbandDISC["DISC"[idx]]++);

    pwife
      .map((val, index) => [" ABCD"[val], discJson[index]])
      .map(([answer, map2]) => map2.indexOf(answer))
      .forEach((idx) => pwifeDISC["DISC"[idx]]++);

    let myPreference = new Array(),
      partnerPreference = new Array();
    let myPreferenceNumber = { D: 0, I: 0, S: 0, C: 0, T: 0 },
      partnerPreferenceNumber = { D: 0, I: 0, S: 0, C: 0, T: 0 };

    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 4; j++) {
        if (" ABCD"[wife[i]] == discJson[i][j]) {
          myPreference[i] = "DISC"[j];
        }
        if (" ABCD"[pwife[i]] == discJson[i][j]) {
          partnerPreference[i] = "DISC"[j];
        }
      }
    }

    myPreference.map(
      (val, index) => (myPreferenceNumber[val] += preference[index] - 3)
    );

    partnerPreference.map(
      (val, index) => (partnerPreferenceNumber[val] += ppreference[index] - 3)
    );
    myPreferenceNumber["T"] =
      myPreferenceNumber["D"] +
      myPreferenceNumber["I"] +
      myPreferenceNumber["S"] +
      myPreferenceNumber["C"];
    partnerPreferenceNumber["T"] =
      partnerPreferenceNumber["D"] +
      partnerPreferenceNumber["I"] +
      partnerPreferenceNumber["S"] +
      partnerPreferenceNumber["C"];

    ["D", "I", "S", "C", "T"].forEach((val) => {
      if (myPreferenceNumber[val] > 6) {
        myPreferenceNumber[val] = "매우 긍정";
      } else if (myPreferenceNumber[val] > 0) {
        myPreferenceNumber[val] = "다소 긍정";
      } else if (myPreferenceNumber[val] == 0) {
        myPreferenceNumber[val] = "보통";
      } else if (myPreferenceNumber[val] > -6) {
        myPreferenceNumber[val] = "다소 부정";
      } else if (myPreferenceNumber[val] <= -6) {
        myPreferenceNumber[val] = "매우 부정";
      }
    });

    ["D", "I", "S", "C", "T"].forEach((val) => {
      if (partnerPreferenceNumber[val] > 6) {
        partnerPreferenceNumber[val] = "매우 긍정";
      } else if (partnerPreferenceNumber[val] > 0) {
        partnerPreferenceNumber[val] = "다소 긍정";
      } else if (partnerPreferenceNumber[val] == 0) {
        partnerPreferenceNumber[val] = "보통";
      } else if (partnerPreferenceNumber[val] > -6) {
        partnerPreferenceNumber[val] = "다소 부정";
      } else if (partnerPreferenceNumber[val] <= -6) {
        partnerPreferenceNumber[val] = "매우 부정";
      }
    });

    let myCheck = new Array();
    let wifeCheck = new Array();

    wife.map(
      (val, ind) =>
        (myCheck[ind] =
          testJson.page_list[ind].question_list[0].string_list[val - 1])
    );
    phusband.map(
      (val, ind) =>
        (wifeCheck[ind] =
          testJson.page_list[ind].question_list[0].string_list[val - 1])
    );

    let pmyCheck = new Array();
    let pwifeCheck = new Array();

    husband.map(
      (val, ind) =>
        (pmyCheck[ind] =
          testJson.page_list[ind].question_list[0].string_list[val - 1])
    );
    pwife.map(
      (val, ind) =>
        (pwifeCheck[ind] =
          testJson.page_list[ind].question_list[0].string_list[val - 1])
    );

    let myTop2 = [
      (new DiscDataManage(wifeDISC)?.getSortedArray())[0],
      (new DiscDataManage(wifeDISC)?.getSortedArray())[1],
    ];
    let partnerTop2 = [
      (new DiscDataManage(phusbandDISC)?.getSortedArray())[0],
      (new DiscDataManage(phusbandDISC)?.getSortedArray())[1],
    ];

    return (
      <Box style={{ width: "100%", marginBottom: "30px" }}>
        <Box style={{ margin: "10px" }}>
          <Typography
            variant="h5"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            부부 행동 유형 테스트 결과
          </Typography>
        </Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <Typography style={{ fontSize: "10px" }}>
            *이 결과는 현재의 행동 유형을 테스트한 결과이며,
          </Typography>
          <Typography style={{ fontSize: "10px" }}>
            절대적인 스타일을 표현한 것이 아닙니다.
          </Typography>
          <Typography style={{ fontSize: "10px" }}>
            따라서, 상황과 환경 및 상호 노력에 따라 바뀔 수 있습니다.
          </Typography>
        </Box>

        <Box style={(this.state.page != 1) ? ({ display: "none" }) : ({ width: "100%" })}>
          <Typography
            variant="h6"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            1. 나와 배우자의 행동유형 스타일
        </Typography>
          <Box>
            <table className="disc-table">
              <tbody>
                <tr style={{ backgroundColor: "#D8F0C0" }}>
                  <th></th>
                  <th>유형</th>
                  <th>유형 이름</th>
                  <th>유형 별칭</th>
                </tr>
                <tr style={{ backgroundColor: "rgb(202, 229, 250)" }}>
                  <td>자신</td>
                  <td>{new DiscDataManage(husbandDISC)?.getTypes()?.Type ?? ""}형</td>
                  <td>{new DiscDataManage(husbandDISC)?.getTypes()?.TypeName ?? ""}</td>
                  <td>{new DiscDataManage(husbandDISC)?.getTypes()?.ProType ?? ""}</td>
                </tr>
                <tr style={{ backgroundColor: "rgb(255, 255, 149)" }}>
                  <td>배우자</td>
                  <td>{new DiscDataManage(phusbandDISC)?.getTypes()?.Type ?? ""}형</td>
                  <td>{new DiscDataManage(phusbandDISC)?.getTypes()?.TypeName ?? ""}</td>
                  <td>{new DiscDataManage(phusbandDISC)?.getTypes()?.ProType ?? ""}</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "300px",
            }}
          >
            <Chart
              width={`${this.state.width * 0.8}px`}
              height={"300px"}
              discMyData={husbandDISC}
              discSpouseData={phusbandDISC}
            ></Chart>
          </div>

          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: "50px",
              border: "1px black solid",
              borderBottom: "0",
              borderRight: "0",
            }}
          >
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                background: "rgb(126,151,175)",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    구분
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    나의 스타일
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    배우자의 스타일
                </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    유형
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(husbandDISC)?.getTypes()?.Type ?? ""}(
                  {new DiscDataManage(husbandDISC)?.getTypes()?.TypeName ?? ""})
                  : {new DiscDataManage(husbandDISC)?.getTypes()?.ProType ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(phusbandDISC)?.getTypes()?.Type ?? ""}(
                  {new DiscDataManage(phusbandDISC)?.getTypes()?.TypeName ?? ""}
                  ) :{" "}
                    {new DiscDataManage(phusbandDISC)?.getTypes()?.ProType ?? ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    성격 특징
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(husbandDISC)?.getTypes()?.Character ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(phusbandDISC)?.getTypes()?.Character ??
                      ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    태도 사교성
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(husbandDISC)?.getTypes()?.attitude ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(phusbandDISC)?.getTypes()?.attitude ?? ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box style={(this.state.page != 2) ? ({ display: "none" }) : ({ width: "100%" })}>
          <Typography
            variant="h6"
            style={{ marginTop: "35px", marginBottom: "5px" }}
          >
            2. 서로가 상대를 체크한 행동유형 비교표
        </Typography>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              border: "1px black solid",
            }}
          >
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                background: "rgb(126,151,175)",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    구분
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    배우자가 나를 체크한 스타일
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    자신 스타일
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    내가 배우자를 체크한 스타일
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    배우자의 스타일
                </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    결과
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(pwifeDISC)?.getTypes()?.Type ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(husbandDISC)?.getTypes()?.Type ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(wifeDISC)?.getTypes()?.Type ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(phusbandDISC)?.getTypes()?.Type ?? ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
            {[..."DISC"].map((char) => (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px solid",
                }}
              >
                <Box
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid",
                  }}
                >
                  <Typography variant="h7">
                    <Box
                      style={{
                        fontSize: "0.6em",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      {`${char}(${['주도형', '사교형', '안정형', '신중형']["DISC".indexOf(char)]})`}
                    </Box>
                  </Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid",
                  }}
                >
                  <Typography variant="h7">
                    <Box
                      style={{
                        fontSize: "0.6em",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      {pwifeDISC[char]}
                    </Box>
                  </Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid",
                  }}
                >
                  <Typography variant="h7">
                    <Box
                      style={{
                        fontSize: "0.6em",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      {husbandDISC[char]}
                    </Box>
                  </Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid",
                  }}
                >
                  <Typography variant="h7">
                    <Box
                      style={{
                        fontSize: "0.6em",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      {wifeDISC[char]}
                    </Box>
                  </Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h7">
                    <Box
                      style={{
                        fontSize: "0.6em",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      {phusbandDISC[char]}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              border: "1px black solid",
              marginTop: "10px",
              marginBottom: "20px",
              borderBottom: "0",
              borderRight: "0",
            }}
          >
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                background: "rgb(126,151,175)",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    구분
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    배우자가 체크한 나의 스타일
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    내가 체크한 배우자의 스타일
                </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    유형
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(pwifeDISC)?.getTypes()?.Type ?? ""}(
                  {new DiscDataManage(pwifeDISC)?.getTypes()?.TypeName ?? ""}
                  ) :{" "}
                    {new DiscDataManage(pwifeDISC)?.getTypes()?.ProType ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(wifeDISC)?.getTypes()?.Type ?? ""}(
                  {new DiscDataManage(wifeDISC)?.getTypes()?.TypeName ?? ""}) :{" "}
                    {new DiscDataManage(wifeDISC)?.getTypes()?.ProType ?? ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    성격 특징
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(pwifeDISC)?.getTypes()?.Character ??
                      ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(wifeDISC)?.getTypes()?.Character ?? ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px black solid",
              }}
            >
              <Box
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    태도 사교성
                </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(pwifeDISC)?.getTypes()?.attitude ?? ""}
                  </Box>
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid",
                }}
              >
                <Typography variant="h7">
                  <Box
                    style={{
                      fontSize: "0.6em",
                      padding: "5px",
                      boxSizing: "border-box",
                    }}
                  >
                    {new DiscDataManage(wifeDISC)?.getTypes()?.attitude ?? ""}
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>

          <table class="compare-table">
            <tbody>
              <tr>
                <th>자신의 스타일</th>
                <th>배우자가 나를 체크한 스타일</th>
              </tr>
              <tr>
                <td>높은C형</td>
                <td>ID형</td>
              </tr>
              <tr>
                <th>배우자 스타일</th>
                <th>내가 배우자를 체크한 스타일</th>
              </tr>
              <tr>
                <td>IDS형</td>
                <td>CI형</td>
              </tr>
            </tbody>
          </table>
        </Box>

        <Box style={(this.state.page != 3) ? ({ display: "none" }) : ({ width: "100%" })}>
          <Typography
            variant="h6"
            style={{ marginTop: "35px", marginBottom: "5px" }}
          >
            3. 자신의 체크와 배우자가 나를 체크한 항목 비교표
        </Typography>

          <Box className="label">
            <Box className="label-inner">
              <Box
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#4B87CB",
                }}
              ></Box>
              <Typography variant="h7" style={{ fontWeight: "700" }}>
                내가 선택한 나
            </Typography>
            </Box>
            <Box className="label-inner">
              <Box
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#A3CF78",
                }}
              ></Box>
              <Typography variant="h7" style={{ fontWeight: "700" }}>
                배우자가 체크한 나
            </Typography>
            </Box>
            <Box className="label-inner">
              <Box
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#ECBB53",
                }}
              ></Box>
              <Typography variant="h7" style={{ fontWeight: "700" }}>
                동일 문항 선택
            </Typography>
            </Box>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              background: "#ffffe5",
            }}
          >
            <Box style={numberBox}>
              <Typography
                variant="h7"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box style={{ fontSize: "0.8em" }}>문항</Box>
              </Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">A</Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">B</Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">C</Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">D</Typography>
            </Box>
          </Box>
          {content.page_list?.map((val, index) => (
            <Box style={{ width: "100%", display: "flex", flexDirection: "row" }}>
              <Box style={numberBox}>
                <Typography variant="h7">{index + 1}</Typography>
              </Box>
              {val.question_list[0].string_list?.map((val2, index2) =>
                husband[index] == index2 + 1 ? (
                  pwife[index] == index2 + 1 ? (
                    <>
                      {/* 중복 */}
                      <Box style={{ ...contentBox, ...colorC }}>
                        <Typography variant="h7">
                          <Box
                            style={{
                              fontSize: "0.6em",
                              padding: "5px",
                              boxSizing: "border-box",
                            }}
                          >
                            {val2}
                          </Box>
                        </Typography>
                      </Box>
                    </>
                  ) : (
                      <>
                        {/* 내가 체크한 나 */}
                        <Box style={{ ...contentBox, ...colorA }}>
                          <Typography variant="h7">
                            <Box
                              style={{
                                fontSize: "0.6em",
                                padding: "5px",
                                boxSizing: "border-box",
                              }}
                            >
                              {val2}
                            </Box>
                          </Typography>
                        </Box>
                      </>
                    )
                ) : pwife[index] == index2 + 1 ? (
                  <>
                    {/* 배우자가 체크한 나 */}
                    <Box style={{ ...contentBox, ...colorB }}>
                      <Typography variant="h7">
                        <Box
                          style={{
                            fontSize: "0.6em",
                            padding: "5px",
                            boxSizing: "border-box",
                          }}
                        >
                          {val2}
                        </Box>
                      </Typography>
                    </Box>
                  </>
                ) : (
                      <>
                        {/* 일반 */}
                        <Box style={contentBox}>
                          <Typography variant="h7">
                            <Box
                              style={{
                                fontSize: "0.6em",
                                padding: "5px",
                                boxSizing: "border-box",
                              }}
                            >
                              {val2}
                            </Box>
                          </Typography>
                        </Box>
                      </>
                    )
              )}
            </Box>
          ))}
        </Box>

        <Box style={(this.state.page != 4) ? ({ display: "none" }) : ({ width: "100%" })}>
          <Typography
            variant="h6"
            style={{ marginTop: "35px", marginBottom: "5px" }}
          >
            4. 배우자의 체크와 내가 배우자를 체크한 항목 비교표
        </Typography>

          <Box className="label">
            <Box className="label-inner">
              <Box
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#4B87CB",
                }}
              ></Box>
              <Typography variant="h7" style={{ fontWeight: "700" }}>
                배우자의 선택
                          </Typography>
            </Box>
            <Box className="label-inner">
              <Box
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#A3CF78",
                }}
              ></Box>
              <Typography variant="h7" style={{ fontWeight: "700" }}>
                내가 선택한 배우자
            </Typography>
            </Box>
            <Box className="label-inner">
              <Box
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#ECBB53",
                }}
              ></Box>
              <Typography variant="h7" style={{ fontWeight: "700" }}>
                동일 문항 선택
            </Typography>
            </Box>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              background: "#ffffe5",
            }}
          >
            <Box style={numberBox}>
              <Typography
                variant="h7"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box style={{ fontSize: "0.8em" }}>문항</Box>
              </Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">A</Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">B</Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">C</Typography>
            </Box>
            <Box style={contentBox}>
              <Typography variant="h7">D</Typography>
            </Box>
          </Box>
          {content.page_list?.map((val, index) => (
            <Box style={{ width: "100%", display: "flex", flexDirection: "row" }}>
              <Box style={numberBox}>
                <Typography variant="h7">{index + 1}</Typography>
              </Box>
              {val.question_list[0].string_list?.map((val2, index2) =>
                phusband[index] == index2 + 1 ? (
                  wife[index] == index2 + 1 ? (
                    <>
                      <Box style={{ ...contentBox, ...colorC }}>
                        <Typography variant="h7">
                          <Box
                            style={{
                              fontSize: "0.6em",
                              padding: "5px",
                              boxSizing: "border-box",
                            }}
                          >
                            {val2}
                          </Box>
                        </Typography>
                      </Box>
                    </>
                  ) : (
                      <>
                        <Box style={{ ...contentBox, ...colorA }}>
                          <Typography variant="h7">
                            <Box
                              style={{
                                fontSize: "0.6em",
                                padding: "5px",
                                boxSizing: "border-box",
                              }}
                            >
                              {val2}
                            </Box>
                          </Typography>
                        </Box>
                      </>
                    )
                ) : wife[index] == index2 + 1 ? (
                  <>
                    <Box style={{ ...contentBox, ...colorB }}>
                      <Typography variant="h7">
                        <Box
                          style={{
                            fontSize: "0.6em",
                            padding: "5px",
                            boxSizing: "border-box",
                          }}
                        >
                          {val2}
                        </Box>
                      </Typography>
                    </Box>
                  </>
                ) : (
                      <>
                        <Box style={contentBox}>
                          <Typography variant="h7">
                            <Box
                              style={{
                                fontSize: "0.6em",
                                padding: "5px",
                                boxSizing: "border-box",
                              }}
                            >
                              {val2}
                            </Box>
                          </Typography>
                        </Box>
                      </>
                    )
              )}
            </Box>
          ))}
        </Box>

        <Box style={(this.state.page != 5) ? ({ display: "none" }) : ({ width: "100%" })}>
          <Typography
            variant="h6"
            style={{ marginTop: "35px", marginBottom: "5px" }}
          >
            5. 자신과 배우자가 체크한 긍정과 부정 항목
        </Typography>

          <table className="pref-table">
            <tbody>
              <tr>
                <th rowSpan={2}>항목</th>
                <th colSpan={2}>내가 배우자를 체크한 항목</th>
                <th colSpan={2}>배우자가 나를 체크한 항목</th>
              </tr>
              <tr>
                <th>문항</th>
                <th>긍부정</th>
                <th>문항</th>
                <th>긍부정</th>
              </tr>

              {myCheck.map((mine, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{mine}</td>
                  <td>
                    {preference[index] == 5 ? (
                      <Box style={{ color: 'rgb(100, 100, 250)' }}>oo</Box>
                    ) : preference[index] == 1 ? (
                      <Box style={{ color: 'rgb(250, 100, 100)' }}>xx</Box>
                    ) : preference[index] == 4 ? (
                      <Box style={{ color: 'rgb(100, 100, 250)' }}>o</Box>
                    ) : preference[index] == 2 ? (
                      <Box style={{ color: 'rgb(250, 100, 100)' }}>x</Box>
                    ) : (
                              <Box>-</Box>
                            )}
                  </td>
                  <td>{pwifeCheck[index]}</td>
                  <td>
                    {ppreference[index] == 5 ? (
                      <Box style={{ color: 'rgb(100, 100, 250)' }}>oo</Box>
                    ) : ppreference[index] == 1 ? (
                      <Box style={{ color: 'rgb(250, 100, 100)' }}>xx</Box>
                    ) : ppreference[index] == 4 ? (
                      <Box style={{ color: 'rgb(100, 100, 250)' }}>o</Box>
                    ) : ppreference[index] == 2 ? (
                      <Box style={{ color: 'rgb(250, 100, 100)' }}>x</Box>
                    ) : (
                              <Box>-</Box>
                            )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box style={{width: "100%", height: "50px"}}></Box>
        <Box style={{ position: "fixed", bottom: "0", paddingBottom: "20px", width: "100%", height: "50px", background: "rgb(250, 250, 250)" }}>
          <Box style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <IconButton onClick={this.onPreviousClick}><NavigateBeforeIcon style={{fontSize: "30px"}} /></IconButton>
            <Box>
              <Typography variant="h5" >
                {this.state.page}/5
              </Typography>
            </Box>
            <IconButton onClick={this.onNextClick}><NavigateNextIcon style={{fontSize: "30px"}} /></IconButton>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CoupleResult;
