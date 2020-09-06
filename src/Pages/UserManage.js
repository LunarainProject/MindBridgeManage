import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import UserCard from '../Components/UserCard';

const BodyStyle = {width: "100%", height: "100% auto"};

class UserManage extends Component {

    constructor(props){
        super(props);
        if((window.location.href).slice(0,-1) != "/"){
            this.props.history.push("/manage/UserManage/");
        }
    }
    

    state = {
        content: new Array(),
        update: 0,
    }
    
    componentDidMount(){
        axios({
        method: 'post',
        url: 'http://gfs3456.cafe24.com/api/userlist.php',
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
            this.setState({
                content : [{"id":"109570206804386970042","name":"everdin jill","email":"tmdflqdnl@naver.com",
                "picture_url":"https:\/\/lh3.googleusercontent.com\/a-\/AOh14GgAMdZh8FeKH4tFif5mfWHDGaq0eGcFQ4TWEk0LKg=s96-c","sex":"male",
                "birth":"2000.11.10"},{"id":"102566946400325414126","name":"LUNARAIN PROJECT","email":"chlor.upload@gmail.com",
                "picture_url":"https:\/\/lh3.googleusercontent.com\/a-\/AOh14GglWEJdEygDuzuJycGBbCH02shjgEeO74EXDdAa=s96-c","sex":"female","birth":"2000.2.1"}]
            });
        console.log("error : " + error);
        }); 
    }

    render() {
        const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};
        return (
            <div style={BodyStyle}>
                <HeaderContainer Content="Sub" Title="유저 관리"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    {
                        this.state.content.map((val)=>(
                            <UserCard id={val.id} name={val.name} email={val.email} pictureUrl={val.picture_url} sex={val.sex} birth={val.birth} ></UserCard>
                        ))
                    }
                </Container>
            </div>
        );
    }
}
  

export default UserManage;