import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea, List, ListItem, ListItemAvatar,ListItemText, Avatar } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import { envGetUrl } from '../env';

const ContainerStyle = {width: "100%", height: "173px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column", marginBottom: "20px"};

const TitleTextStyle = {fontWeight: "700"};
const TextMargin = {marginTop: "37px"};

export class VideoCard extends Component {

    alertDel = () => {
        if(window.confirm("VideoSrl : " + this.props.VideoSrl + "번\n" + this.props.Title + "을(를) 삭제하시겠습니까?")){
            axios({
                method: 'post',
                url: envGetUrl()+'/api/videodel.php',
                params:{
                    VideoSrl: this.props.VideoSrl
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
            this.props.Update(this.props.VideoSrl);
        }
    };

    render() {
        return (
            <div>
                <Card style={ContainerStyle} variant="outlined" onClick={(this.props.Plus != "true") &&(this.alertDel)}>
                    <CardActionArea>
                        <CardContent style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
                            <Box style={{display: "flex", flexDirection: "row"}}>  
                                {(this.props.Plus != "true") &&(
                                    <img src={envGetUrl()+"/videoImg/"+this.props.VideoSrl+".jpg"}  style={{width: "260px", height:"140px", marginRight: "20px"}}
                                    onClick={this.alertModify}
                                    />
                                )}
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
                                        비디오를 삭제하려면 클릭하세요.
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
  

export default VideoCard;
