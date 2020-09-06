import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea, List, ListItem, ListItemAvatar,ListItemText, Avatar } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import testImg from '../img/test.png';

const ContainerStyle = {width: "100%", height: "173px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column", marginBottom: "20px"};

const TitleTextStyle = {fontWeight: "700"};
const TextMargin = {marginTop: "37px"};

export class UserCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {id, name, pictureUrl, sex, email, birth} = this.props;
        const pictureHttpUrl = pictureUrl.replace("/\/gi","");

        return (
            <div>
                <Card style={ContainerStyle} variant="outlined">
                    <CardActionArea>
                        <CardContent style={{display: "flex",flexDirection: "row"}}>
                            <Box style={{width: "180px", height: "100%", boxSizing: "border-box"}}>
                                <img src={pictureHttpUrl} style={{width: "140px"}}></img>
                            </Box>
                            <Box style={{width: "1000px", height: "100%"}}>
                                <Typography variant = "h6" style={{marginTop: "5px"}}>
                                    이름 : {name} <br/>
                                    성별 : {(sex == "male")?("남자"):("여자")} <br/>
                                    이메일 : {email} <br/>
                                    생년월일 : {birth}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
  

export default UserCard;
