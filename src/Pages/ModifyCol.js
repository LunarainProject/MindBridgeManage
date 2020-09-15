import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import DelSurveyCard from '../Components/DelSurveyCard';
import HeaderContainer from '../Components/HeaderContainer.js';
import MainCard from "../Components/MainCard";
import { envGetUrl } from '../env';

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", 
padding: "0"};
const ContainerStyle = {width: "100%", height: "280px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "row", marginBottom: "20px", padding: "10px 20px 10px 20px", alignItems: "center"};
const ImgBox = {width: "35%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"};
const InfoBox = {marginLeft: "2%",width: "63%", height: "100%", display: "flex", flexDirection: "column", marginTop: "18px"};
const ReactMarkDown = require('react-markdown');

class ModifyCol extends Component {
    constructor(props){
        super(props);
        this.state = {
            srl : this.props.match.params.srl,
            Title : "Title",
            SubTitle : "SubTitle",
            Description : "Description",
            ImgUrl : "ImgUrl",
            InfoLabel : "InfoLabel",
            content: "",
        };
    }
    
    GetDataInServer = () => {
        axios({
        method: 'post',
        url: envGetUrl()+'/pkg/index.php',
        params:{
        pkg_srl: this.props.match.params.srl
        },
        header:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
          this.setState({
             content: responseJson
          });
        })
        .catch((error) => {
           console.log("error : " + error);
        }); 
    }
    
    componentDidMount(){
        this.GetDataInServer();
        axios({
            method: 'post',
            url: envGetUrl()+'/api/testdescription.php',
            params:{
              srl: this.state.srl
            },
            header:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
            console.log("responseJson : " + responseJson);
            this.setState({
                Title: responseJson.Title,
                SubTitle: responseJson.SubTitle,
                Description: responseJson.Description,
                InfoLabel: responseJson.InfoLabel,
            });
            console.log(this.state.content);
        })
        .catch((error) => {
            console.log("error : " + error);
        }); 
    }

    goTestManage = () => {
        this.props.history.push("/manage/TestManage/");
    }

    render() {
        const ContainerStyle2 = {width: "100%", minHeight: "173px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
        ,display: "flex", flexDirection: "column",};
        
        
        return (
            <Box style={BodyStyle}>
                <HeaderContainer Content="Sub" Title="패키지 관리"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    <Card style={ContainerStyle} variant="outlined">
                        <Box style={ImgBox}>
                            <img src={envGetUrl()+"/pkgImg/"+this.state.srl+".jpg"}  style={{width: "100%"}}/>
                        </Box>
                        <Box style={InfoBox}>
                            <Typography variant="h4">
                                제목 : {this.state.Title}
                            </Typography>
                            <Typography variant="h4">
                                부제목 : {this.state.SubTitle}
                            </Typography>
                            <Typography variant="h4">
                                설명 : {this.state.Description}
                            </Typography>
                            <Typography variant="h4">
                                문항 : {this.state.InfoLabel}
                            </Typography>
                            <Typography variant="h4">
                                이미지 url 
                            </Typography>
                            <Typography variant="h4">
                                http://gfs3456.cafe24.com/pkgImg/{this.state.srl}.jpg
                            </Typography>
                        </Box>
                    </Card>
                    <Box style={{marginBottom: "20px", marginTop: "0"}}>
                    <Card style={ContainerStyle2} variant="outlined">
                        <CardContent style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <Box style={{padding: "10px", display: "flex", flexDirection: "column"}}>
                                <Typography variant="h5" style={{display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "10px", fontWeight: "700"}}>
                                    유저에게 보이는 테스트 시작 페이지입니다.
                                </Typography>
                                <ReactMarkDown source={this.state.content} skipHtml={false} escapeHtml={false}></ReactMarkDown>
                            </Box>
                        </CardContent>
                    </Card>
                    </Box>
                    <Box style={{marginBottom: "20px", marginTop: "0"}}>
                        <Link to={"/manage/ee/" + this.state.srl + "/1"}>
                            <MainCard Title="설문 테스트" SubTitle="앱에 게시될 테스트를 실행시킵니다." ></MainCard>
                        </Link>
                    </Box>
                    <DelSurveyCard goTestManage = {this.goTestManage} Plus="true" Title="패키지 삭제" SubTitle="설문조사 파일을 삭제하려면 클릭하세요." pkgId={this.state.srl} ></DelSurveyCard>
                </Container>
            </Box>
        );
    }
}
  

export default ModifyCol;