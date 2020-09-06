import React, {Component} from 'react';
import { Button, Box, Container, Typography, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Iframe from 'react-iframe';

const ReactMarkDown = require('react-markdown');

class ColumnScreen extends Component {

    constructor(props){
        super(props);
        
    }

    state = {
        content: ""
    }

    GetDataInServer = () => {
        axios({
        method: 'post',
        url: 'http://gfs3456.cafe24.com/col/index.php',
        params:{
        column_srl: this.props.match.params.columnSrl
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

    componentDidMount(){
        this.GetDataInServer();
    }
      
    render(){
        return(
            <Box style={{padding: "10px"}}>
                <ReactMarkDown source={this.state.content} skipHtml={false} escapeHtml={false} />
            </Box>
        )
    }
}

export default ColumnScreen;