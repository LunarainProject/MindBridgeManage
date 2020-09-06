import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import ColumnCard from '../Components/ColumnCard';

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};

class SmsTest extends Component {

    constructor(props){
        super(props);
        
    }
    

    state = {
        content: new Array(),
        update: 0,
    }
    
    updateChecker = (pkgIdnumber) => {
        let NewState = new Array();
        this.state.content.map((val,index) =>{
            if(val.ColumnSrl != pkgIdnumber){
                NewState[index] = val;
            }
        })

        this.setState({
            content: NewState
        });
    }
    
    componentDidMount(){
        this.setState({
            content : [{"ColumnSrl":"1","Title":"TestTitle","SubTitle":"TestSubTitle"}, 
            {"ColumnSrl":"2","Title":"TestTitle","SubTitle":"TestSubTitle"}]
        });
        axios({
        method: 'post',
        url: 'https://api.wideshot.co.kr/api/v1/message/sms',
        params:{
            "callback":"025713925",
            "contents":"".$count,
            "receiverTelNo":"01031204914",
            "userKey":this.props.match.params.id,
            "advertisementYn":"N"
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
                <HeaderContainer Content="Sub" Title="칼럼 관리"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    {
                        this.state.content.map((val)=>(
                            <ColumnCard Update = {this.updateChecker} Title={val.Title} SubTitle={val.SubTitle} ColumnSrl={val.ColumnSrl} ></ColumnCard>
                        ))
                    }
                    <Link to="./AddCol">
                        <ColumnCard Plus="true" Title="칼럼 추가" SubTitle="칼럼을 추가하려면 클릭하세요."></ColumnCard>
                    </Link>
                </Container>
            </div>
        );
    }
}

export default SmsTest;