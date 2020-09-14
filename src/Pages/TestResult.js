import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/default.css';
import testJson from '../survey/test.json';
import discJson from '../survey/disc.json';
import CoupleResult from '../Components/CoupleResult';
import ResultRouter from './ResultPages/ResultRouter';

const BodyStyle = {width: "100%", height: "100% auto"};
const InnerContainerStyle = {width: "100%", height: "100%", background: "#f0f0f000", display: "flex", flexDirection: "column", padding: "0"};

class TestResult extends Component {
    constructor(props){
        super(props)
    }

    state = {
        user_srl: this.props.match.params.id,
        pkg_id: this.props.match.params.pkgSrl,
        count: this.props.match.params.count,
        result: new String(),
        content: new Object(),
    }

    componentDidMount(){
        axios({
            method: 'post',
            url: 'http://gfs3456.cafe24.com/api/testResult.php',
            params:{
              access_token: this.state.user_srl,
              pkg_id: this.state.pkg_id,
              count: this.state.count,
            },
            header:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then((response) => response.data)
        .then((responseJson) => { 
            console.log("responseJson : " + responseJson);
            this.setState({
                result: responseJson
            });
        })
        .catch((error) => {
            this.setState({
                result: [{"page_number":"1","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"1","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"1","problem_number":"2","type":"2","gender":"0","answer":"5"},{"page_number":"2","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"2","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"2","problem_number":"2","type":"2","gender":"0","answer":"3"},{"page_number":"3","problem_number":"1","type":"1","gender":"1","answer":"1"},{"page_number":"3","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"3","problem_number":"2","type":"2","gender":"0","answer":"3"},{"page_number":"4","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"4","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"4","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"5","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"5","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"5","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"6","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"6","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"6","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"7","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"7","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"7","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"8","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"8","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"8","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"9","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"9","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"9","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"10","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"10","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"10","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"11","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"11","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"11","problem_number":"2","type":"2","gender":"0","answer":"1"},{"page_number":"12","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"12","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"12","problem_number":"2","type":"2","gender":"0","answer":"3"},{"page_number":"13","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"13","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"13","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"14","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"14","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"14","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"15","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"15","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"15","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"16","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"16","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"16","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"17","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"17","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"17","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"18","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"18","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"18","problem_number":"2","type":"2","gender":"0","answer":"3"},{"page_number":"19","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"19","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"19","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"20","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"20","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"20","problem_number":"2","type":"2","gender":"0","answer":"3"},{"page_number":"21","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"21","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"21","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"22","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"22","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"22","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"23","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"23","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"23","problem_number":"2","type":"2","gender":"0","answer":"1"},{"page_number":"24","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"24","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"24","problem_number":"2","type":"2","gender":"0","answer":"5"},{"page_number":"25","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"25","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"25","problem_number":"2","type":"2","gender":"0","answer":"1"},{"page_number":"26","problem_number":"1","type":"1","gender":"1","answer":"1"},{"page_number":"26","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"26","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"27","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"27","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"27","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"28","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"28","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"28","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"29","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"29","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"29","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"30","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"30","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"30","problem_number":"2","type":"2","gender":"0","answer":"5"},{"page_number":"31","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"31","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"31","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"32","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"32","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"32","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"33","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"33","problem_number":"1","type":"1","gender":"2","answer":"1"},{"page_number":"33","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"34","problem_number":"1","type":"1","gender":"1","answer":"4"},{"page_number":"34","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"34","problem_number":"2","type":"2","gender":"0","answer":"1"},{"page_number":"35","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"35","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"35","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"36","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"36","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"36","problem_number":"2","type":"2","gender":"0","answer":"5"},{"page_number":"37","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"37","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"37","problem_number":"2","type":"2","gender":"0","answer":"2"},{"page_number":"38","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"38","problem_number":"1","type":"1","gender":"2","answer":"4"},{"page_number":"38","problem_number":"2","type":"2","gender":"0","answer":"4"},{"page_number":"39","problem_number":"1","type":"1","gender":"1","answer":"3"},{"page_number":"39","problem_number":"1","type":"1","gender":"2","answer":"2"},{"page_number":"39","problem_number":"2","type":"2","gender":"0","answer":"3"},{"page_number":"40","problem_number":"1","type":"1","gender":"1","answer":"2"},{"page_number":"40","problem_number":"1","type":"1","gender":"2","answer":"3"},{"page_number":"40","problem_number":"2","type":"2","gender":"0","answer":"4"}]
            })
            console.log("error : " + error);
        }); 
        // axios({
        //   method: 'post',
        //   url: 'http://gfs3456.cafe24.com/connectedSheet/index.php',
        //   params:{
        //     pkg_id: this.state.pkg_id,
        //   },
        //   header:{
        //   'Access-Control-Allow-Origin' : '*',
        //   'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //   }
        // }).then((response) => response.data)
        // .then((responseJson) => { 
        //   this.setState({
        //      content: responseJson
        //   });
        //   console.log("responseJson");
        //   console.log(responseJson);
        //   this.setState({
        //       contentObj: responseJson
        //   });
        //   console.log(this.state.contentObj);
        //   this.CountInitialization();
        // })
        // .catch((error) => {
        //    console.log("error : " + error);
        //  }); 
         this.setState({
             content: testJson,
         })

         console.log('route');
    }

    render(){
        return(
            <Box style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px"}}>
                {
                    (this.state.pkg_id == '27')?(
                        <CoupleResult result={this.state.result} content={this.state.content} 
                        partnerCount={this.props.match.params.partnerCount} user_srl={this.state.user_srl} ></CoupleResult>
                    ):(
                    <ResultRouter
                        pkgId={this.state.pkg_id}
                        content={this.state.content}
                        result={Object.values(this.state.result)}
                        partnerCount={this.props.match.params.partnerCount}
                        user_srl={this.state.user_srl}
                    ></ResultRouter>
                    )
                }
            </Box>
        );
    }
}

export default TestResult;