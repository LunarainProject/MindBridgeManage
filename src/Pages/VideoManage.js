import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import VideoCard from '../Components/VideoCard';
import { envGetUrl } from '../env';
import { checkAdmin } from '../api/check'

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};

class VideoManage extends Component {

    constructor(props){
        super(props);

        checkAdmin();

        if((window.location.href).slice(0,-1) != "/"){
            this.props.history.push("/manage/VideoManage/");
        }
    }
    

    state = {
        content: new Object(),
        update: 0,
    }
    
    updateChecker = (pkgIdnumber) => {
        let NewState = new Object();
        Object.values(this.state.content).map((val,index) =>{
            if(val.videoSrl != pkgIdnumber){
                NewState[index] = val;
            }
        })

        this.setState({
            content: NewState
        });
    }
    
    componentDidMount(){
        this.setState({
            content : {"0":{"videoSrl":"1","videoUrl":"https:\/\/www.youtube.com\/watch?v=TcoabWmp7KA&list=RD9dQg_SVN7wo&index=11","title":"1","subtitle":"1","description":"1"},"2":{"videoSrl":"21","videoUrl":"123","title":"213","subtitle":"123","description":"123"}}
        });
        axios({
        method: 'post',
        url: envGetUrl()+'/api/videolist.php',
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
                <HeaderContainer Content="Sub" Title="동영상 관리"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    {
                        Object.values(this.state.content)?.map((val)=>(
                            <VideoCard Update = {this.updateChecker} VideoSrl={val.videoSrl} Title={val.title} SubTitle={val.subtitle} VideoUrl={val.videoUrl} ></VideoCard>
                        ))
                    }
                    <Link to="./AddVideo">
                        <VideoCard Plus="true" Title="동영상 추가" SubTitle="동영상을 추가하려면 클릭하세요."></VideoCard>
                    </Link>
                </Container>
            </div>
        );
    }
}

export default VideoManage;