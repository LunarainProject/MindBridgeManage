import React, {Component} from 'react';
import { Button, Box, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';
import '../css/default.css';
import MainCard from '../Components/MainCard.js';
import HeaderContainer from '../Components/HeaderContainer.js';

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0", marginBottom: "20px"};

class Main extends Component {
    constructor(props){
        super(props);
        if((window.location.href).slice(0,-1) != "/"){
            this.props.history.push("/manage/");
        }
    }

    render(){
        return (
            <div style={BodyStyle}>
                <HeaderContainer Content="Main" Title="관리자 페이지"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    <Link to="./TestManage">
                        <MainCard Title="테스트 관리" SubTitle="앱에 게시될 테스트를 관리합니다." ></MainCard>
                    </Link>
                    <Link to="./ColumnManage" style={{marginTop: "20px"}}>
                        <MainCard Title="칼럼 관리" SubTitle="앱에 게시될 칼럼을 관리합니다." ></MainCard>
                    </Link>
                    <Link to="./VideoManage" style={{marginTop: "20px"}}>
                        <MainCard Title="동영상 관리" SubTitle="앱에 게시될 추천 동영상을 관리합니다." ></MainCard>
                    </Link>
                    <Link to="./UserManage" style={{marginTop: "20px"}}>
                        <MainCard Title="유저 관리" SubTitle="앱을 사용하는 유저들의 기본 정보를 관리합니다." ></MainCard>
                    </Link>
                    <Link to="./CoupleManage" style={{marginTop: "20px"}}>
                        <MainCard Title="커플 관리" SubTitle="앱을 사용하는 커플들의 기본 정보를 관리합니다." ></MainCard>
                    </Link>
                </Container>
            </div>
        );
    }
};

export default Main;