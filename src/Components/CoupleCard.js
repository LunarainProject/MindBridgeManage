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

export class CoupleCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { husbandName, husbandEmail, husbandSex, husbandBirth, husbandPictureUrl,
            wifeName, wifeEmail, wifeSex, wifeBirth, wifePictureUrl
        } = this.props;
        const husbandPictureHttpUrl = husbandPictureUrl?.replace("/\/gi","");
        const wifePictureHttpUrl = wifePictureUrl?.replace("/\/gi","");

        return (
            <div>
                <Card style={ContainerStyle} variant="outlined">
                    <CardActionArea>
                        <CardContent style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
                            <Box style={{height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                <img src={husbandPictureHttpUrl} style={{width: "140px"}}></img>
                                <Typography variant = "h6" style={{marginTop: "5px", marginLeft: "5px"}}>
                                    이름 : {husbandName} <br/>
                                    성별 : {(husbandSex == "male")?("남자"):("여자")} <br/>
                                    이메일 : {husbandEmail} <br/>
                                    생년월일 : {husbandBirth}
                                </Typography>
                            </Box>
                            <Box style={{height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                                <Typography variant = "h6" style={{marginTop: "5px", marginRight: "5px"}}>
                                    이름 : {wifeName} <br/>
                                    성별 : {(wifeSex == "male")?("남자"):("여자")} <br/>
                                    이메일 : {wifeEmail} <br/>
                                    생년월일 : {wifeBirth}
                                </Typography>
                                <Box style={{width: "140px", height: "100%", boxSizing: "border-box"}}>
                                    <img src={wifePictureHttpUrl} style={{width: "140px"}}></img>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
  

export default CoupleCard;
