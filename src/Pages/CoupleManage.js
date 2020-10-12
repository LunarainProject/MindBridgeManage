import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import UserCard from '../Components/UserCard';
import CoupleCard from '../Components/CoupleCard';
import { envGetUrl } from '../env';
import { checkAdmin } from '../api/check'

const BodyStyle = {width: "100%", height: "100% auto"};

class CoupleManage extends Component {

    constructor(props){
        super(props);

        checkAdmin();
        
        if((window.location.href).slice(0,-1) != "/"){
            this.props.history.push("/manage/CoupleManage/");
        }
    }
    

    state = {
        content: new Array(),
        update: 0,
    }
    
    componentDidMount(){
        axios({
        method: 'post',
        url: envGetUrl()+'/api/couplelist.php',
        header:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
        this.setState({
            content: responseJson
        });
            this.setState({
                content: responseJson
            });
        })
        .catch((error) => {
            this.setState({
                content : [{"husband":[{"id":"109570206804386970042","name":"everdin jill","email":"tmdflqdnl@naver.com",
                "picture_url":"https:\/\/lh3.googleusercontent.com\/a-\/AOh14GgAMdZh8FeKH4tFif5mfWHDGaq0eGcFQ4TWEk0LKg=s96-c","sex":"male","birth":"2000.11.10"}],
                "wife":[{"id":"102566946400325414126","name":"LUNARAIN PROJECT","email":"chlor.upload@gmail.com",
                "picture_url":"https:\/\/lh3.googleusercontent.com\/a-\/AOh14GglWEJdEygDuzuJycGBbCH02shjgEeO74EXDdAa=s96-c","sex":"female","birth":"2000.2.1"}]}]
            });
        }); 
    }

    render() {

        console.log(this.state.content)
        console.log(this.state.content[0])
        const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};
        return (
            <div style={BodyStyle}>
                <HeaderContainer Content="Sub" Title="커플 관리"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    {
                        this.state.content?.map((val)=>(
                            (val != null || val != undefined)&&(
                            <CoupleCard
                                husbandName={val.husband[0].name} husbandEmail={val.husband[0].email} husbandPictureUrl={val.husband[0].picture_url} husbandSex={val.husband[0].sex} husbandBirth={val.husband[0].birth} 
                                wifeName={val.wife[0].name} wifeEmail={val.wife[0].email} wifePictureUrl={val.wife[0].picture_url} wifeSex={val.wife[0].sex} wifeBirth={val.wife[0].birth} 
                            ></CoupleCard>
                            )
                        ))
                    }
                </Container>
            </div>
        );
    }
}
  

export default CoupleManage;