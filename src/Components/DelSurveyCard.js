import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea, List, ListItem, ListItemAvatar,ListItemText, Avatar } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import testImg from '../img/test.png';
import { envGetUrl } from '../env';

const ContainerStyle = {width: "100%", height: "173px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column", marginBottom: "20px"};

const TitleTextStyle = {fontWeight: "700"};
const TextMargin = {marginTop: "37px"};

export class DelSurveyCard extends Component {
    constructor(props){
        super(props);
    }

    alertDel = () => {
        if(window.confirm("PkgId : " + this.props.pkgId + "번\n패키지를 삭제하시겠습니까?")){
            axios({
                method: 'post',
                url: envGetUrl()+'/api/testdel.php',
                params:{
                    pkgId: this.props.pkgId
                },
                header:{
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then((response) => {
                console.log("response : " + JSON.stringify(response));
            })
            .catch((error) => {
                console.log("error : " + error);
            }); 
            alert("삭제가 완료되었습니다.");
            this.props.goTestManage();
        }
    };

    render() {
        return (
            <div>
                <Card style={ContainerStyle} variant="outlined" onClick={this.alertDel}>
                    <CardActionArea>
                        <CardContent style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
                            <Box style={{display: "flex", flexDirection: "row"}}> 
                                <Box>
                                    <Typography variant="h2" style={TitleTextStyle}>
                                        {this.props.Title}
                                    </Typography>
                                    <Typography variant="h5" style={TextMargin}>
                                        {this.props.SubTitle}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h2" style={TitleTextStyle}>
                                    &nbsp;
                                </Typography>
                                {(this.props.Plus != "true") &&(
                                    <Typography variant="h5" style={TextMargin}>
                                        패키지를 삭제하려면 클릭하세요.
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
  

export default DelSurveyCard;
