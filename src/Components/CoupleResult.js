import React, { Component } from 'react';
import { Button, Box, Container, Typography, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Iframe from 'react-iframe';
import mdTest from '../md/1.md'
import StartPageMain from "../Components/StartPageMain";
import StartPageSub from "../Components/StartPageSub";
import testJson from '../survey/test.json';
import discJson from '../survey/disc.json';
import { abs } from 'math';
import Chart from '../disc/Chart';
import DiscDataManage from '../disc/disc';

const BodyStyle = { width: "100%", height: "100% auto" };
const ReactMarkDown = require('react-markdown');
class CoupleResult extends Component {

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    state = {
        partnerResult: new Array(),
        width: 0, height: 0, husbandDISC: new Object(), wifeDISC: new Object(),
        phusbandDISC: new Object(), pwifeDISC: new Object(),
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        axios({
            method: 'post',
            url: 'http://gfs3456.cafe24.com/api/partnerTestResult.php',
            params: {
                access_token: this.props.user_srl,
                count: this.props.partnerCount,
            },
            header: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }).then((response) => response.data)
            .then((responseJson) => {
                console.log("responseJson : " + responseJson);
                this.setState({
                    partnerResult: responseJson
                });
            })
            .catch((error) => {
                this.setState({
                    partnerResult: [{ "page_number": "1", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "1", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "1", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "2", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "2", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "2", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "3", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "3", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "3", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "4", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "4", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "4", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "5", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "5", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "5", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "6", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "6", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "6", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "7", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "7", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "7", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "8", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "8", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "8", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "9", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "9", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "9", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "10", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "10", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "10", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "11", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "11", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "11", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "12", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "12", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "12", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "13", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "13", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "13", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "14", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "14", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "14", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "15", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "15", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "15", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "16", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "16", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "16", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "17", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "17", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "17", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "18", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "18", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "18", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "19", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "19", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "19", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "20", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "20", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "20", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "21", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "21", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "21", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "22", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "22", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "22", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "23", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "23", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "23", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "24", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "24", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "24", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "25", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "25", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "25", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "26", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "26", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "26", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "27", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "27", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "27", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "28", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "28", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "28", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "29", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "29", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "29", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "30", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "30", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "30", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "31", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "31", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "31", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "32", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "32", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "32", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "33", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "33", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "33", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "34", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "34", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "34", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "35", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "35", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "35", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "36", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "36", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "36", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "37", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "37", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "37", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "38", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "38", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "38", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "39", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "39", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "39", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }, { "page_number": "40", "problem_number": "1", "type": "1", "gender": "1", "answer": "0" }, { "page_number": "40", "problem_number": "1", "type": "1", "gender": "2", "answer": "0" }, { "page_number": "40", "problem_number": "2", "type": "2", "gender": "0", "answer": "0" }]
                })
                console.log("error : " + error);
            });
    }

    render() {
        const numberBox = { width: "12%", display: "flex", flexDirection: "row", justifyContent: "center", border: "1px black solid", boxSizing: "border-box" };
        const contentBox = { width: "22%", display: "flex", flexDirection: "row", justifyContent: "center", border: "1px black solid", boxSizing: "border-box", alignItems: "center" };
        const colorA = { background: "#CAE5FA" };
        const colorB = { background: "#D8F0C0" };
        const colorC = { background: "#FCFAD9" };

        const { content, result } = this.props;
        let husband = new Array(), wife = new Array(), preference = new Array();
        let husbandDISC = { D: 0, I: 0, S: 0, C: 0 }, wifeDISC = { D: 0, I: 0, S: 0, C: 0 };
        let phusband = new Array(), pwife = new Array(), ppreference = new Array();
        let phusbandDISC = { D: 0, I: 0, S: 0, C: 0 }, pwifeDISC = { D: 0, I: 0, S: 0, C: 0 };

        Object.values(result).map((val, index) => (
            (val.gender == 1) ? (
                husband[val.page_number - 1] = val.answer
            ) : (
                    (val.gender == 2) ? (
                        wife[val.page_number - 1] = val.answer
                    ) : (
                            preference[val.page_number - 1] = val.answer
                        )
                )
        ))

        husband.map((val, index) => [" ABCD"[val], discJson[index]]).
            map(([answer, map2]) => map2.indexOf(answer)).forEach(idx => husbandDISC["DISC"[idx]]++)

        wife.map((val, index) => [" ABCD"[val], discJson[index]]).
            map(([answer, map2]) => map2.indexOf(answer)).forEach(idx => wifeDISC["DISC"[idx]]++)


        Object.values(this.state.partnerResult).map((val, index) => (
            (val.gender == 1) ? (
                phusband[val.page_number - 1] = val.answer
            ) : (
                    (val.gender == 2) ? (
                        pwife[val.page_number - 1] = val.answer
                    ) : (
                            ppreference[val.page_number - 1] = val.answer
                        )
                )
        ))

        phusband.map((val, index) => [" ABCD"[val], discJson[index]]).
            map(([answer, map2]) => map2.indexOf(answer)).forEach(idx => phusbandDISC["DISC"[idx]]++)

        pwife.map((val, index) => [" ABCD"[val], discJson[index]]).
            map(([answer, map2]) => map2.indexOf(answer)).forEach(idx => pwifeDISC["DISC"[idx]]++)

        let myPreference = new Array(), partnerPreference = new Array();
        let myPreferenceNumber = { "D": 0, "I": 0, "S": 0, "C": 0, "T": 0 }, partnerPreferenceNumber = { "D": 0, "I": 0, "S": 0, "C": 0, "T": 0 };

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

        myPreference.map((val, index) => (
            myPreferenceNumber[val] += (preference[index] - 3)
        ))

        partnerPreference.map((val, index) => (
            partnerPreferenceNumber[val] += (ppreference[index] - 3)
        ))
        myPreferenceNumber["T"] = myPreferenceNumber["D"] + myPreferenceNumber["I"] + myPreferenceNumber["S"] + myPreferenceNumber["C"];
        partnerPreferenceNumber["T"] = partnerPreferenceNumber["D"] + partnerPreferenceNumber["I"] + partnerPreferenceNumber["S"] + partnerPreferenceNumber["C"];

        ["D", "I", "S", "C", "T"].forEach((val) => {
            if (myPreferenceNumber[val] > 6) {
                myPreferenceNumber[val] = "매우 긍정"
            } else if (myPreferenceNumber[val] > 0) {
                myPreferenceNumber[val] = "다소 긍정"
            } else if (myPreferenceNumber[val] == 0) {
                myPreferenceNumber[val] = "보통"
            } else if (myPreferenceNumber[val] > -6) {
                myPreferenceNumber[val] = "다소 부정"
            } else if (myPreferenceNumber[val] <= -6) {
                myPreferenceNumber[val] = "매우 부정"
            }
        });

        ["D", "I", "S", "C", "T"].forEach((val) => {
            if (partnerPreferenceNumber[val] > 6) {
                partnerPreferenceNumber[val] = "매우 긍정"
            } else if (partnerPreferenceNumber[val] > 0) {
                partnerPreferenceNumber[val] = "다소 긍정"
            } else if (partnerPreferenceNumber[val] == 0) {
                partnerPreferenceNumber[val] = "보통"
            } else if (partnerPreferenceNumber[val] > -6) {
                partnerPreferenceNumber[val] = "다소 부정"
            } else if (partnerPreferenceNumber[val] <= -6) {
                partnerPreferenceNumber[val] = "매우 부정"
            }
        });

        let myCheck = new Array();
        let wifeCheck = new Array();

        wife.map((val, ind) => (myCheck[ind] = testJson.page_list[ind].question_list[0].string_list[val - 1]))
        phusband.map((val, ind) => (wifeCheck[ind] = testJson.page_list[ind].question_list[0].string_list[val - 1]))

        let pmyCheck = new Array();
        let pwifeCheck = new Array();

        husband.map((val, ind) => (pmyCheck[ind] = testJson.page_list[ind].question_list[0].string_list[val - 1]))
        pwife.map((val, ind) => (pwifeCheck[ind] = testJson.page_list[ind].question_list[0].string_list[val - 1]))

        let myTop2 = [(new DiscDataManage(wifeDISC)?.getSortedArray())[0], (new DiscDataManage(wifeDISC)?.getSortedArray())[1]];
        let partnerTop2 = [(new DiscDataManage(phusbandDISC)?.getSortedArray())[0], (new DiscDataManage(phusbandDISC)?.getSortedArray())[1]];

        return (
            <Box style={{ width: "100%", marginBottom: "30px" }}>
                <Box style={{ margin: "10px" }}>
                    <Typography variant="h5" style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}>
                        부부 행동 유형 테스트 결과
                    </Typography>
                </Box>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "300px" }}>
                    <Chart width={`${this.state.width * 0.8}px`}
                        height={"300px"} discMyData={husbandDISC} discSpouseData={phusbandDISC} >
                    </Chart>
                </div>

                <Box style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "50px", border: "1px black solid", borderBottom: "0", borderRight: "0" }}>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", background: "rgb(126,151,175)", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    구분
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    나의 스타일
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">

                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    배우자가 체크한 나의 스타일
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    유형
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(husbandDISC)?.getTypes()?.Type ?? ""}({new DiscDataManage(husbandDISC)?.getTypes()?.TypeName ?? ""}) : {new DiscDataManage(husbandDISC)?.getTypes()?.ProType ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(pwifeDISC)?.getTypes()?.Type ?? ""}({new DiscDataManage(pwifeDISC)?.getTypes()?.TypeName ?? ""}) : {new DiscDataManage(pwifeDISC)?.getTypes()?.ProType ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    성격 특징
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(husbandDISC)?.getTypes()?.Character ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">

                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(pwifeDISC)?.getTypes()?.Character ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    태도 사교성
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(husbandDISC)?.getTypes()?.attitude ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(pwifeDISC)?.getTypes()?.attitude ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>






                <Box style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "50px", border: "1px black solid" }}>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", background: "rgb(126,151,175)", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">

                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    구분
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    배우자가 나를 체크한 스타일
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">

                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    자신 스타일
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    차이
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    긍정/부정
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    결과
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(pwifeDISC)?.getTypes()?.Type ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(husbandDISC)?.getTypes()?.Type ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    상호차이가 남
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {partnerPreferenceNumber["T"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    D(주도형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {pwifeDISC["D"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {husbandDISC["D"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(pwifeDISC["D"] - husbandDISC["D"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {partnerPreferenceNumber["D"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    I(사교형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {pwifeDISC["I"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {husbandDISC["I"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(husbandDISC["I"] - pwifeDISC["I"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {partnerPreferenceNumber["I"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    S(안정형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {pwifeDISC["S"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {husbandDISC["S"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(husbandDISC["S"] - pwifeDISC["S"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {partnerPreferenceNumber["S"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    C(신중형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {pwifeDISC["C"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {husbandDISC["C"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(husbandDISC["C"] - pwifeDISC["C"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {partnerPreferenceNumber["C"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                <Box style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "50px", border: "1px black solid", borderBottom: "0", borderRight: "0" }}>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", background: "rgb(126,151,175)", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    구분
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    배우자의 스타일
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    내가 체크한 배우자의 스타일
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    유형
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(phusbandDISC)?.getTypes()?.Type ?? ""}({new DiscDataManage(phusbandDISC)?.getTypes()?.TypeName ?? ""}) : {new DiscDataManage(phusbandDISC)?.getTypes()?.ProType ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(wifeDISC)?.getTypes()?.Type ?? ""}({new DiscDataManage(wifeDISC)?.getTypes()?.TypeName ?? ""}) : {new DiscDataManage(wifeDISC)?.getTypes()?.ProType ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    성격 특징
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(phusbandDISC)?.getTypes()?.Character ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">

                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(wifeDISC)?.getTypes()?.Character ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    태도 사교성
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(phusbandDISC)?.getTypes()?.attitude ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "40%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(wifeDISC)?.getTypes()?.attitude ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>




                <Box style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "50px", border: "1px black solid" }}>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", background: "rgb(126,151,175)", borderBottom: "1px black solid" }}>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    구분
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    내가 배우자를 체크한 스타일
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">

                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    배우자의 스타일
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    차이
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    긍정/부정
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    결과
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(wifeDISC)?.getTypes()?.Type ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {new DiscDataManage(phusbandDISC)?.getTypes()?.Type ?? ""}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    상호차이가 남
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {myPreferenceNumber["T"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    D(주도형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {wifeDISC["D"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {phusbandDISC["D"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(wifeDISC["D"] - phusbandDISC["D"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {myPreferenceNumber["D"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    I(사교형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {wifeDISC["I"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {phusbandDISC["I"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(wifeDISC["I"] - phusbandDISC["I"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {myPreferenceNumber["I"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    S(안정형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {wifeDISC["S"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {phusbandDISC["S"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(wifeDISC["S"] - phusbandDISC["S"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {myPreferenceNumber["S"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "row" }}>

                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    C(신중형)
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {wifeDISC["C"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {phusbandDISC["C"]}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRight: "1px solid" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {abs(wifeDISC["C"] - phusbandDISC["C"])}
                                </Box>
                            </Typography>
                        </Box>
                        <Box style={{ width: "20%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h7">
                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                    {myPreferenceNumber["C"]}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box style={{ width: "100%", border: "1px black solid", padding: "10px 20px", boxSizing: "border-box", marginTop: "50px", display: "flex", flexDirection: "column" }}>
                    <Typography variant="h7">
                        내가 배우자를 체크한 높은 두 가지 스타일
                    </Typography>
                    <Typography variant="h7">
                        1. ({myTop2[0].code} = {myTop2[0].value}) 2. ({myTop2[1].code} = {myTop2[1].value})
                    </Typography>
                    <Typography variant="h7" style={{ marginTop: "10px" }}>
                        배우자가 나를 체크한 높은 두 가지 스타일
                    </Typography>
                    <Typography variant="h7">
                        1. ({partnerTop2[0].code} = {partnerTop2[0].value}) 2. ({partnerTop2[1].code} = {partnerTop2[1].value})
                    </Typography>
                </Box>


                <Box style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "10px", marginTop: "50px", background: "#FCDCFA" }}>
                    <Box><Typography variant="h7" style={{ fontWeight: "700", color: "#CAE5FA" }}>내가 선택한 나&nbsp;</Typography></Box>
                    <Box><Typography variant="h7" style={{ fontWeight: "700", color: "#D8F0C0" }}>&nbsp;배우자가 선택한 나&nbsp;</Typography></Box>
                    <Box><Typography variant="h7" style={{ fontWeight: "700", color: "#FCFAD9" }}>&nbsp;중복</Typography></Box>
                </Box>
                <Box style={{ width: "100%", display: "flex", flexDirection: "row", background: "#ffffe5" }}>
                    <Box style={numberBox}>
                        <Typography variant="h7" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Box style={{ fontSize: "0.8em" }}>
                                문항
                            </Box>
                        </Typography>
                    </Box>
                    <Box style={contentBox}>
                        <Typography variant="h7">
                            A
                        </Typography>
                    </Box>
                    <Box style={contentBox}>
                        <Typography variant="h7">
                            B
                        </Typography>
                    </Box>
                    <Box style={contentBox}>
                        <Typography variant="h7">
                            C
                        </Typography>
                    </Box>
                    <Box style={contentBox}>
                        <Typography variant="h7">
                            D
                        </Typography>
                    </Box>
                </Box>
                {
                    content.page_list?.map((val, index) => (
                        <Box style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                            <Box style={numberBox}>
                                <Typography variant="h7">
                                    {index + 1}
                                </Typography>
                            </Box>
                            {
                                val.question_list[0].string_list?.map((val2, index2) => (
                                    (husband[index] == index2 + 1) ? (
                                        (phusband[index] == index2 + 1) ? (
                                            <>
                                                <Box style={{ ...contentBox, ...colorC }}>
                                                    <Typography variant="h7">
                                                        <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                                            {val2}
                                                        </Box>
                                                    </Typography>
                                                </Box>
                                            </>
                                        ) : (
                                                <>
                                                    <Box style={{ ...contentBox, ...colorA }}>
                                                        <Typography variant="h7">
                                                            <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                                                {val2}
                                                            </Box>
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )
                                    ) : (
                                            (phusband[index] == index2 + 1) ? (
                                                <>
                                                    <Box style={{ ...contentBox, ...colorB }}>
                                                        <Typography variant="h7">
                                                            <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                                                {val2}
                                                            </Box>
                                                        </Typography>
                                                    </Box>
                                                </>
                                            ) : (
                                                    <>
                                                        <Box style={contentBox}>
                                                            <Typography variant="h7">
                                                                <Box style={{ fontSize: "0.6em", padding: "5px", boxSizing: "border-box" }}>
                                                                    {val2}
                                                                </Box>
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                )
                                        )
                                ))
                            }
                        </Box>
                    ))
                }
                <Box style={{ width: "100%", border: "1px black solid", borderBottom: "0", display: "flex", flexDirection: "column", marginTop: "50px" }}>
                    <Box style={{ width: "100%", background: "#ffffe5" }}>
                        <Typography variant="h7" style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", borderBottom: "1px black solid", padding: "5px", boxSizing: "border-box" }}>
                            배우자가 자신을 체크한 스타일과 항목비교
                        </Typography>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid", background: "#ffffe5" }}>
                        <Box style={{ width: "15%", borderRight: "1px solid" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>항목</Typography>
                        </Box>
                        <Box style={{ width: "32.5%", borderRight: "1px solid" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>배우자체크</Typography>
                        </Box>
                        <Box style={{ width: "32.5%", borderRight: "1px solid" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>자신</Typography>
                        </Box>
                        <Box style={{ width: "20%" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>긍부정</Typography>
                        </Box>
                    </Box>
                    <Box>
                        {
                            pwifeCheck.map((val, index) => (
                                <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                                    <Box style={{ width: "15%", borderRight: "1px solid", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{index + 1}</Typography>
                                    </Box>
                                    <Box style={{ width: "32.5%", borderRight: "1px solid", padding: "5px", boxSizing: "border-box" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center" }}>{val}</Typography>
                                    </Box>
                                    <Box style={{ width: "32.5%", borderRight: "1px solid", padding: "5px", boxSizing: "border-box" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center" }}>{pmyCheck[index]}</Typography>
                                    </Box>
                                    <Box style={{ width: "20%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center" }}>
                                            {
                                                (ppreference[index] == 5) ? (<Box>oo</Box>) : (
                                                    (ppreference[index] == 1) ? (<Box>xx</Box>) : (
                                                        (ppreference[index] == 4) ? (<Box>o</Box>) : (
                                                            (ppreference[index] == 2) ? (<Box>x</Box>) : (
                                                                <Box>-</Box>
                                                            )
                                                        )
                                                    )
                                                )
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>

                <Box style={{ width: "100%", border: "1px black solid", borderBottom: "0", display: "flex", flexDirection: "column", marginTop: "50px" }}>
                    <Box style={{ width: "100%", background: "#ffffe5" }}>
                        <Typography variant="h7" style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", borderBottom: "1px black solid", padding: "5px", boxSizing: "border-box" }}>
                            자신이 배우자를 체크한 스타일과 항목비교
                        </Typography>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid", background: "#ffffe5" }}>
                        <Box style={{ width: "15%", borderRight: "1px solid" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>항목</Typography>
                        </Box>
                        <Box style={{ width: "32.5%", borderRight: "1px solid" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>자신체크</Typography>
                        </Box>
                        <Box style={{ width: "32.5%", borderRight: "1px solid" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>배우자</Typography>
                        </Box>
                        <Box style={{ width: "20%" }}>
                            <Typography variant="h7" style={{ display: "flex", justifyContent: "center", padding: "5px", boxSizing: "border-box" }}>긍부정</Typography>
                        </Box>
                    </Box>
                    <Box>
                        {
                            wifeCheck.map((val, index) => (
                                <Box style={{ width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px black solid" }}>
                                    <Box style={{ width: "15%", borderRight: "1px solid", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{index + 1}</Typography>
                                    </Box>
                                    <Box style={{ width: "32.5%", borderRight: "1px solid", padding: "5px", boxSizing: "border-box" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center" }}>{myCheck[index]}</Typography>
                                    </Box>
                                    <Box style={{ width: "32.5%", borderRight: "1px solid", padding: "5px", boxSizing: "border-box" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center" }}>{val}</Typography>
                                    </Box>
                                    <Box style={{ width: "20%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <Typography variant="h7" style={{ display: "flex", justifyContent: "center" }}>
                                            {
                                                (preference[index] == 5) ? (<Box>oo</Box>) : (
                                                    (preference[index] == 1) ? (<Box>xx</Box>) : (
                                                        (preference[index] == 4) ? (<Box>o</Box>) : (
                                                            (preference[index] == 2) ? (<Box>x</Box>) : (
                                                                <Box>-</Box>
                                                            )
                                                        )
                                                    )
                                                )
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default CoupleResult;