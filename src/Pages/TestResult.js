import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import testJson from '../survey/test.json';
import discJson from '../survey/disc.json';
import CoupleResult from '../Components/CoupleResult';
import ResultRouter from './ResultPages/ResultRouter';
import { envGetUrl } from '../env';
import { parse } from 'query-string';

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};

class TestResult extends Component {
    constructor(props){
        super(props)
    }

    state = {
        user_srl: this.props.match.params.id,
        pkg_id: this.props.match.params.pkgSrl,
        count: this.props.match.params.count,
        spouseCount: this.props.match.params.partnerCount,
        result: [],
        content: {},
        couple: false,
        spouseResult: [],
    }

    async componentDidMount(){
        console.log(this.state);
        let response;
        try {
            response = await axios({
                method: 'post',
                url: envGetUrl()+'/api/testResult.php',
                params:{
                access_token: this.state.user_srl,
                pkg_id: this.state.pkg_id,
                count: this.state.count,
                },
                header:{
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
            });
        } catch(e) {
            console.log('fetch error: ', e);
        }
        let result = {};
        try {
            result = response.data;
        } catch(e) {
            console.log('parse error: ', e);
        }

        let contentRes;
        try {
            contentRes = await fetch(`${envGetUrl()}/pkg/index.php?pkg_srl=${this.state.pkg_id}`)
        } catch(e) {
            console.log('fetch error: ', e);
        }

        let contentJson;
        try {
            contentJson = await contentRes.json();
        } catch(e) {
            console.log('parse error: ', e);
        }

        let coupleRes;
        try{
            coupleRes = await fetch(`${envGetUrl()}/api/CheckCouple.php?pkg_id=${this.state.pkg_id}`)
        } catch(e) {
            console.log('fetch error: ', e);
        }

        let coupleJson;
        try {
            coupleJson = await coupleRes.json();
        } catch(e) {
            console.log('parse error');
        }

        console.log('couple ****: ', coupleJson);
    
        let spouseResult;

        // coupled survey 일 경우
        if(coupleJson?.couple == 'true') {
            let response;
            let spouse = [];
            console.log(`${envGetUrl()}/api/PartnerTestResult2.php?access_token=${this.state.user_srl}&pkg_id=${this.state.pkg_id}&count=${this.state.spouseCount}`);
            try {
            response = await fetch(`${envGetUrl()}/api/PartnerTestResult2.php?access_token=${this.state.user_srl}&pkg_id=${this.state.pkg_id}&count=${this.state.spouseCount}`)
            } catch(e) {    
            console.log('fetch error: ', e);
            }
            try {
                spouse = await response?.json() ?? [];
            } catch(e) {
                console.log('json parse error', e);
            }
    
            spouseResult = spouse.map(val => ({
                page_number: parseInt(val.page_number),
                problem_number: parseInt(val.problem_number),
                type: parseInt(val.type),
                gender: parseInt(val.gender),
                answer: parseInt(val.answer)
            }));

            console.log('spouseResult*******:', spouseResult);

        }

        console.log("contentJson*******:",contentJson);

        this.setState({
            result: Object.values(result).map(val => ({
                page_number: parseInt(val.page_number),
                problem_number: parseInt(val.problem_number),
                type: parseInt(val.type),
                gender: parseInt(val.gender),
                answer: parseInt(val.answer)
            })),
            content: contentJson,
            spouseResult: spouseResult,
         });
    }

    render(){

        console.log('result: ', this.state.result);
        console.log('spouseResult: ', this.state.spouseResult);

        return(
            <Box style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px"}}>
                {
                    (this.state.pkg_id == '27')?(
                        <CoupleResult result={this.state.result} content={this.state.content} 
                        partnerCount={this.props.match.params.partnerCount} user_srl={this.state.user_srl} ></CoupleResult>
                    ):(
                    <ResultRouter
                        pkgId={this.state.pkg_id}
                        content={this.state.content}
                        result={this.state.result}
                        partnerCount={this.state.spouseCount}
                        couple={this.state.couple}
                        spouseResult={this.state.spouseResult}
                        user_srl={this.state.user_srl}
                    ></ResultRouter>
                    )
                }
            </Box>
        );
    }
}

export default TestResult;