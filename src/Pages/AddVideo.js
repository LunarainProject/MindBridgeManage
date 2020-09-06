import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea, Input, FormControlLabel,TextField,FormControl  } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import SurveyCard from '../Components/SurveyCard';

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", 
padding: "0"};
const ContainerStyle = {width: "100%", height: "430px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column", marginBottom: "20px", padding: "10px 20px 10px 20px", alignItems: "center"};
const FileBox = {width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}
const TextFieldStyle = {width: "1200px", marginTop: "20px"};
const fullStyle = {width: "100%", height: "100%"};

class AddVideo extends Component {
    constructor(props){
        super(props);
        this.state = {
            VideoUrl: "VideoUrl",
            ImgMessage: "프로필 사진을 업로드 해주세요. 16:9 권장 (.jpg, .jpeg, .png)",
            text: "파일 업로드",
            ImgText: "이미지 업로드",
            Title: "Title",
            SubTitle: "SubTitle",
            Description: "Description",
            imgUpload: null,
        };
    }

    UploadPost = () => {
        if(this.state.Title != "Title" && this.state.SubTitle != "SubTitle" && this.state.VideoUrl != "VideoUrl"
        && this.state.Description != "Description" && this.state.ImgMessage != "프로필 사진을 업로드 해주세요. 16:9 권장 (.jpg, .jpeg, .png)" ){
            if(((this.state.ImgMessage).includes(".jpg") 
            || (this.state.ImgMessage).includes(".jpeg") || (this.state.ImgMessage).includes(".png") || (this.state.ImgMessage).includes(".JPG")
            || (this.state.ImgMessage).includes(".PNG"))){
                axios({
                    method: 'post',
                    url: 'http://gfs3456.cafe24.com/api/PushVideo.php',
                    params:{
                    title: this.state.Title,
                    subtitle: this.state.SubTitle,
                    description: this.state.Description,
                    video_url: this.state.VideoUrl,
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
                const formData = new FormData();
                formData.append('ImgFile', this.state.imgUpload);
                axios.post("http://gfs3456.cafe24.com/api/PushVideoFile.php", formData).then(res => {
                    console.log("res : " + JSON.stringify(res));
                    alert("동영상 등록이 성공적으로 완료되었습니다.");
                }).catch(err => {
                    alert('에러 : ' + err);
                })

                this.props.history.push('/manage/');
            }else{
                alert("파일 형식을 확인해주세요.");
            }
        }else{
            alert("입력하지 않은 값이 있습니다.\n입력을 확인해주세요.");
        }
    }

    getTitle = (e) => {
        this.setState({
            Title : e.target.value
        });
        console.log("Title : " + e.target.value);
        console.log("Title : " + this.state.Title);
    }

    getSubTitle = (e) => {
        this.setState({
            SubTitle : e.target.value
        });
    }

    getDescription = (e) => {
        this.setState({
            Description : e.target.value
        });
    }

    getVideoUrl = (e) => {
        this.setState({
            VideoUrl : e.target.value
        });
    }

     getUploadedImgName = (e) => {
         let files = e.target.files,
             value = e.target.value,
             ImgMessage;
         if( files && files.length > 1 ) ImgMessage = `${files.length} files selected`;
         else                            ImgMessage = value.split( '\\' ).pop();
      
         if(ImgMessage) this.setState({
             imgUpload: e.target.files[0],
             ImgMessage: ImgMessage,
         });
      }
 

    render() {
        return (
            <Box style={BodyStyle}>
                <HeaderContainer Content="Sub" Title="동영상 추가"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    <Card style={ContainerStyle} variant="outlined">
                        <FormControl>
                            <TextField id="Title" label="동영상의 제목을 입력해주세요." style={TextFieldStyle} onChange={this.getTitle}></TextField>
                            <TextField id="SubTitle" label="동영상의 부제목을 입력해주세요." style={TextFieldStyle} onChange={this.getSubTitle}></TextField>
                            <TextField id="Description" label="동영상의 설명을 입력해주세요." style={TextFieldStyle} onChange={this.getDescription}></TextField>
                            <TextField id="Url" label="동영상의 url을 입력해주세요." style={TextFieldStyle} onChange={this.getVideoUrl}></TextField>
                            <Box style={fullStyle}>
                                <Box className="filebox" style = {{...FileBox, ...TextFieldStyle}}>
                                    <Box>
                                        <Typography variant="h6">
                                            {this.state.ImgMessage}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <input id="abcd" type="file" className="km-btn-file" accept="image/jpg, image/jpeg, image/png"
                                            onChange={this.getUploadedImgName}>
                                        </input>
                                        <label htmlFor="abcd" className="km-button km-button--primary km-btn-file-label">
                                            <span>{this.state.ImgText}</span>
                                        </label>
                                    </Box>
                                </Box>
                            </Box>
                            <Button variant="contained" color="primary" style={TextFieldStyle} onClick={this.UploadPost}>
                                <Typography variant="h5">
                                동영상 추가
                                </Typography>
                            </Button>
                        </FormControl>
                    </Card>
                </Container>
            </Box>
        );
    }
}
  

export default AddVideo;