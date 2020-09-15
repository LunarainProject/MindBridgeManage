import React, {Component} from 'react';
import { Button, Box, Container, Typography, } from '@material-ui/core';
import Iframe from 'react-iframe';
import axios from 'axios';
import { envGetUrl } from '../env';

class StartPageSub extends Component {


    constructor(props){
        super(props)
        console.log("this.props.pkgSrl : " + this.props.pkgSrl)
    }

    GetDataInServer = () => {
        axios({
        method: 'post',
        url: envGetUrl()+'/pkgStart/index.php',
        params:{
            pkg_srl: this.props.pkgSrl
        },
        header:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
          this.setState({
            pkgTitle : responseJson.pkgTitle,
            questionNumber : responseJson.questionNumber ,
            checkContent : responseJson.checkContent,  
            resultAndAnalysis : responseJson.resultAndAnalysis
          });
        })
        .catch((error) => {
           console.log("error : " + error);
        }); 
    }

    componentDidMount(){
        this.GetDataInServer();
    }

    state = {
        pkgTitle : "부부 행동 유형 검사란?" ,
        questionNumber : "40" ,
        checkContent : "문항을 보고 자신과 배우자의 행동 유형에 가장 가깝다고 생각되는 항목에 체크합니다.",  
        resultAndAnalysis : ["부부의 행동유형 각각 분석", "배우자 연결 분석", "행동유형에 따른 긍정 부정"]
    }

    render(){

        return(
            <Box style={{marginBottom: "120px"}}>
                <Box style={{display:"flex", flexDirection:"row", justifyContent: "center"}}>
                    <Typography variant="h5" style={{fontWeight: "700"}}>
                        {this.state.pkgTitle}
                    </Typography>
                </Box>

                <Box style={{display:"flex", marginTop:"40px", flexDirection:"row", justifyContent: "center"}}>
                    <Typography variant="h6" style={{fontWeight: "700"}}>
                        테스트 하는 방법
                    </Typography>
                </Box>
                <Box style={{marginTop: "20px", padding: "10px", boxSizing: "border-box"}} boxShadow={2}>
                    <Typography variant="h7">
                        ※ 검사 문항 : {this.state.questionNumber}문항<br/><br/>
                        ※ 체크 사항 : {this.state.checkContent}<br/><br/>
                        ※ 결과 및 분석<br/>
                        {
                            this.state.resultAndAnalysis?.map((val, index) => (
                                <Box>
                                    &nbsp; ({index + 1}) {val}<br/>
                                </Box>
                            ))
                        }
                    </Typography>
                </Box>
            </Box>
        );
    }
}

export default StartPageSub;