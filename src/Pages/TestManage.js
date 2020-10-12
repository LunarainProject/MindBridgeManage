import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import SurveyCard from '../Components/SurveyCard';
import { envGetUrl } from '../env';
import { checkAdmin } from '../api/check'

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};

class TestManage extends Component {

    constructor(props){
        super(props);

        checkAdmin();
        
        if((window.location.href).slice(0,-1) != "/"){
            this.props.history.push("/manage/TestManage/");
        }
    }
    

    state = {
        content: new Array(),
        update: 0,
    }
    
    updateChecker = (pkgIdnumber) => {
        let NewState = new Array();
        this.state.content.map((val,index) =>{
            if(val.PkgId != pkgIdnumber){
                NewState[index] = val;
            }
        })

        this.setState({
            content: NewState
        });
    }
    
    componentDidMount(){
        this.setState({
            content : [{"PkgId":"1","Title":"TestTitle","SubTitle":"TestSubTitle","InfoLabel":"TestInfoLabel"},
            {"PkgId":"2","Title":"TestTitle","SubTitle":"TestSubTitle","InfoLabel":"TestInfoLabel"}, 
            {"PkgId":"14","Title":"TestTitle","SubTitle":"TestSubTitle","InfoLabel":"TestInfoLabel"}]
        });
        axios({
        method: 'post',
        url: envGetUrl()+'/api/testlist.php',
        header:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
        this.setState({
            content: responseJson
        });
        console.log("responseJson");
        console.log(responseJson);
        this.setState({
            content: responseJson
        });
        console.log(this.state.content);
        })
        .catch((error) => {
        console.log("error : " + error);
        }); 
    }

    render() {
        return (
            <div style={BodyStyle}>
                <HeaderContainer Content="Sub" Title="테스트 관리"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    {
                        this.state.content.map((val)=>(
                            <SurveyCard Update = {this.updateChecker} Title={val.Title} SubTitle={val.SubTitle} pkgId={val.PkgId} ></SurveyCard>
                        ))
                    }
                    <Link to="./AddPkg">
                        <SurveyCard Update = {this.updateChecker} Plus="true" Title="설문조사 패키지 추가" SubTitle="설문조사 패키지를 추가하려면 클릭하세요."></SurveyCard>
                    </Link>
                </Container>
            </div>
        );
    }
}
  

export default TestManage;