import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, TextField,FormControl, Checkbox  } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import HeaderContainer from '../Components/HeaderContainer.js';
import SurveyCard from '../Components/SurveyCard';
import { useHistory } from "react-router-dom";
import { envGetUrl } from '../env';


const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", 
padding: "0",};
const ContainerStyle = {width: "100%", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column", marginBottom: "20px", padding: "10px 20px 10px 20px", alignItems: "center", paddingBottom: "30px"};
const FileBox = {width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}
const TextFieldStyle = {width: "1200px", marginTop: "20px"};
const fullStyle = {width: "100%", height: "100%"};

class AddPkg extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "카드에 들어갈 패키지 파일을 업로드 해주세요. (.survey)",
            ImgMessage: "카드에 들어갈 프로필 사진을 업로드 해주세요. 16:9 권장 (.jpg, .jpeg, .png)",
            text: ".survey파일 업로드",
            ImgText: "이미지 업로드",
            Title: "Title",
            SubTitle: "SubTitle",
            Description: "Description",
            fileUpload: null,
            imgUpload: null,
            InfoLabel: "8+6문항",
            pkgTitle: "설명 페이지에 들어갈 패키지의 제목을 입력해주세요.",
            questionNumber: "설명 페이지에 들어갈 문항 개수를 입력해주세요. ex) 40",
            checkContent: "설명 페이지에 들어갈 테스트의 설명을 입력해주세요.",
            resultAndAnalysis: ["1번"],
            coupleCheck: false,
        };
    }

    UploadPost = () => {
        if(this.state.Title != "Title" && this.state.SubTitle != "SubTitle" && this.state.message != "카드에 들어갈 패키지 파일을 업로드 해주세요. (.survey)"
        && this.state.Description != "Description" && this.state.ImgMessage != "카드에 들어갈 프로필 사진을 업로드 해주세요. 16:9 권장 (.jpg, .jpeg, .png)"
        && this.state.pkgTitle != "설명 페이지에 들어갈 패키지의 제목을 입력해주세요." && this.state.questionNumber != "설명 페이지에 들어갈 문항 개수를 입력해주세요. ex) 40"
        && this.state.checkContent != "설명 페이지에 들어갈 테스트의 설명을 입력해주세요."
         ){
            if((this.state.message).includes(".survey") && ((this.state.ImgMessage).includes(".jpg") 
            || (this.state.ImgMessage).includes(".jpeg") || (this.state.ImgMessage).includes(".png") || (this.state.ImgMessage).includes(".JPG")
            || (this.state.ImgMessage).includes(".PNG")) ){
                axios({
                    method: 'post',
                    url: envGetUrl()+'/api/PushPkg.php',
                    params:{
                        Title: this.state.Title,
                        SubTitle: this.state.SubTitle,
                        Description: this.state.Description,
                        InfoLabel: this.state.InfoLabel,
                        pkgTitle: this.state.pkgTitle,
                        questionNumber: this.state.questionNumber,
                        checkContent: this.state.checkContent,
                        resultAndAnalysis: this.state.resultAndAnalysis,
                        coupleCheck: this.state.coupleCheck,
                    },
                    header:{
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Content-Type' : 'multipart/form-data'
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
                axios.post(envGetUrl()+"/api/PushPkgFile.php", formData).then(res => {
                    console.log("res : " + JSON.stringify(res));
                    alert("테스트 등록이 성공적으로 완료되었습니다.");
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
            Title : e.target.value,
        });
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

    getInfoLabel = (e) => {
        this.setState({
            InfoLabel : e.target.value
        });
    }


    getInfoPkgTitle = (e) => {
        this.setState({
            pkgTitle : e.target.value
        });
    }

    getInfoQuestionNumber = (e) => {
        this.setState({
            questionNumber : e.target.value
        });
    }

    getInfoCheckContent = (e) => {
        this.setState({
            checkContent : e.target.value
        });
    }

    getCoupleCheckbox = (e) => {
        this.setState({
            coupleCheck: e.target.checked
        })
    }
    
    getInfoResultAndAnalysis = (e, index) => {
        let newArray = new Array();
        this.state.resultAndAnalysis.map((val, ind) => (
            (index == ind)?(
                newArray[ind] = e.target.value
            ):(
                newArray[ind] = val
            )
        ))
        this.setState({
            resultAndAnalysis: newArray
        });

        console.log(this.state.resultAndAnalysis)
    }


    AddResultAndAnalysis = (e) => {
        this.setState({
            resultAndAnalysis: [...this.state.resultAndAnalysis, `${this.state.resultAndAnalysis.length + 1}번`]
        });
    }

    DelResultAndAnalysis = (e) => {

        this.setState({
            resultAndAnalysis: this.state.resultAndAnalysis.splice(0, this.state.resultAndAnalysis.length - 1)
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
                <HeaderContainer Content="Sub" Title="패키지 추가"></HeaderContainer>
                <Container style={InnerContainerStyle}>
                    <Card style={ContainerStyle} variant="outlined">
                        <FormControl>
                            <TextField id="Title" label="카드에 들어갈 패키지의 제목을 입력해주세요." style={TextFieldStyle} onChange={this.getTitle}></TextField>
                            <TextField id="SubTitle" label="카드에 들어갈 패키지의 부제목을 입력해주세요." style={TextFieldStyle} onChange={this.getSubTitle}></TextField>
                            <TextField id="Description" label="카드에 들어갈 패키지의 설명을 입력해주세요." style={TextFieldStyle} onChange={this.getDescription}></TextField>
                            <TextField id="InfoLabel" label="카드에 들어갈 문항 정보를 입력해주세요. ex) 8+6문항" style={TextFieldStyle} onChange={this.getInfoLabel}></TextField>
                            
                            <TextField id="pkgTitle" label="설명 페이지에 들어갈 패키지의 제목을 입력해주세요." style={TextFieldStyle} onChange={this.getInfoPkgTitle}></TextField>
                            <TextField id="questionNumber" label="설명 페이지에 들어갈 문항 개수를 입력해주세요. ex) 40" style={TextFieldStyle} onChange={this.getInfoQuestionNumber}></TextField>
                            <TextField id="checkContent" label="설명 페이지에 들어갈 테스트의 설명을 입력해주세요." style={TextFieldStyle} onChange={this.getInfoCheckContent}></TextField>

                            {
                                this.state.resultAndAnalysis.map((val, index)=> (
                                    <TextField label={`${index + 1}번`} style={TextFieldStyle} onChange={(e) => {this.getInfoResultAndAnalysis(e, index)}}></TextField>
                                ))
                            }

                            <Box style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>

                                <Button variant="contained" color="primary" style={{...TextFieldStyle, width: "590px"}} onClick={this.AddResultAndAnalysis}>
                                    <Typography variant="h5">
                                        결과 분석 추가
                                    </Typography>
                                </Button>

                                <Button variant="contained" color="primary" style={{...TextFieldStyle, width: "590px"}} onClick={this.DelResultAndAnalysis}>
                                    <Typography variant="h5">
                                        결과 분석 제거
                                    </Typography>
                                </Button>

                            </Box> 

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
                            <Box style={{...fullStyle, height: "60px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Box>
                                    <Typography variant="h6" >
                                        커플용 패키지라면 체크해주세요.
                                    </Typography>
                                </Box>
                                <Box>
                                    <Checkbox checked={this.state.coupleCheck} onClick={this.getCoupleCheckbox} />
                                </Box>
                            </Box>

                            <Button variant="contained" color="primary" style={{...TextFieldStyle}} onClick={this.UploadPost}>
                                <Typography variant="h5">
                                    패키지 추가
                                </Typography>
                            </Button> 
                    
                        </FormControl>
                    </Card>
                    
                    
                    <a href={`${envGetUrl()}/editor/`} target="_blank">
                        <SurveyCard Plus="true" Title="설문조사 파일 생성 (.survey)" SubTitle="설문조사 파일을 생성하려면 클릭하세요."></SurveyCard>
                    </a>
                </Container>
            </Box>
        );
    }
}
  
export default AddPkg;