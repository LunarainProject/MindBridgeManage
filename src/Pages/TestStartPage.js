import React, {Component} from 'react';
import { Button, Box, Container, Typography, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Iframe from 'react-iframe';
import mdTest from '../md/1.md'
import StartPageMain from "../Components/StartPageMain";
import StartPageSub from "../Components/StartPageSub";

const BodyStyle = {width: "100%", height: "100% auto"};
const ReactMarkDown = require('react-markdown');

class UserManage extends Component {

    constructor(props){
        super(props);

    }

    GetDataInServer = () => {
        axios({
        method: 'post',
        url: 'http://gfs3456.cafe24.com/pkg/index.php',
        params:{
        pkg_srl: this.props.match.params.pkgSrl
        },
        header:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
          this.setState({
             content: responseJson
          });
        })
        .catch((error) => {
           console.log("error : " + error);
        }); 
    }
    
    state = {
        content: new Array(),
        update: 0,
    }
    
    componentDidMount(){
        this.GetDataInServer();
    }

    render() {

        const surveyLink = "/manage/ee/" + this.props.match.params.pkgSrl + "/" + this.props.match.params.id;

        return (
            <Box style={{width:"100%" ,display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", marginTop: "20px", boxSizing: "border-box"}}>
                <Container>
                    {(this.props.match.params.pkgSrl == 27)?(
                        <StartPageMain/>
                    ):(
                        <StartPageSub pkgSrl = {this.props.match.params.pkgSrl} />
                    )}
                </Container>

                <Container style={{position: "fixed", bottom: "60px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Box boxShadow = {2} style={{cursor: "pointer"}}>
                        <Link to={surveyLink}>
                            <Button style={{ background:"#ffbad1", width: "270px", height: "50px", }}>
                                <Typography variant="h6">
                                    테스트 시작하기
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
        );
    }
}
  

export default UserManage;