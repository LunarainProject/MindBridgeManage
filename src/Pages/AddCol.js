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
const ContainerStyle = {width: "100%", height: "420px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column", marginBottom: "20px", padding: "10px 20px 10px 20px", alignItems: "center"};
const FileBox = {width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}
const TextFieldStyle = {width: "1200px", marginTop: "20px"};
const fullStyle = {width: "100%", height: "100%"};

class AddPkg extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "markdown 파일을 업로드 해주세요. (.md)",
            ImgMessage: "프로필 사진을 업로드 해주세요. 16:9 권장 (.jpg, .jpeg, .png)",
            text: "파일 업로드",
            ImgText: "이미지 업로드",
            Title: "Title",
            SubTitle: "SubTitle",
            Description: "Description",
            fileUpload: null,
            imgUpload: null,
        };
    }

    UploadPost = () => {
        if(this.state.Title != "Title" && this.state.SubTitle != "SubTitle" && this.state.message != "markdown 파일을 업로드 해주세요. (.md)"
        && this.state.Description != "Description" && this.state.ImgMessage != "프로필 사진을 업로드 해주세요. 16:9 권장 (.jpg, .jpeg, .png)" ){
            if((this.state.message).includes(".md") && ((this.state.ImgMessage).includes(".jpg") 
            || (this.state.ImgMessage).includes(".jpeg") || (this.state.ImgMessage).includes(".png") || (this.state.ImgMessage).includes(".JPG")
            || (this.state.ImgMessage).includes(".PNG"))){
                axios({
                    method: 'post',
                    url: 'http://gfs3456.cafe24.com/api/PushCol.php',
                    params:{
                    Title: this.state.Title,
                    SubTitle: this.state.SubTitle,
                    Description: this.state.Description,
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
                formData.append('selectFile', this.state.fileUpload);
                formData.append('ImgFile', this.state.imgUpload);
                axios.post("http://gfs3456.cafe24.com/api/PushColFile.php", formData).then(res => {
                    console.log("res : " + JSON.stringify(res));
                    alert("칼럼 등록이 성공적으로 완료되었습니다.");
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

    getUploadedFileName = (e) => {
        let files = e.target.files,
            value = e.target.value,
            messages;
        if( files && files.length > 1 ) messages = `${files.length} files selected`;
        else                            messages = value.split( '\\' ).pop();
     
        if(messages) this.setState({
            fileUpload: e.target.files[0],
            message: messages,
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
                <HeaderContainer Content="Sub" Title="칼럼 추가"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    <Card style={ContainerStyle} variant="outlined">
                        <FormControl>
                            <TextField id="Title" label="칼럼의 제목을 입력해주세요." style={TextFieldStyle} onChange={this.getTitle}></TextField>
                            <TextField id="SubTitle" label="칼럼의 부제목을 입력해주세요." style={TextFieldStyle} onChange={this.getSubTitle}></TextField>
                            <TextField id="Description" label="칼럼의 설명을 입력해주세요." style={TextFieldStyle} onChange={this.getDescription}></TextField>
                            <Box style={fullStyle}>
                                <Box className="filebox" style = {{...FileBox, ...TextFieldStyle}}>
                                    <Box>
                                        <Typography variant="h6">
                                            {this.state.message}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <input id="abc" type="file" className="km-btn-file" 
                                            onChange={this.getUploadedFileName}>
                                        </input>
                                        <label htmlFor="abc" className="km-button km-button--primary km-btn-file-label">
                                            <span>{this.state.text}</span>
                                        </label>
                                    </Box>
                                </Box>
                            </Box>
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
                                    칼럼 추가
                                </Typography>
                            </Button>
                        </FormControl>
                    </Card>
                    <SurveyCard Plus="true" Title="칼럼 파일 생성 안내" SubTitle="칼럼 파일의 확장자는 (.md)이며 관련 에디터로 생성해야 합니다."></SurveyCard>
                </Container>
            </Box>
        );
    }
}
  

export default AddPkg;