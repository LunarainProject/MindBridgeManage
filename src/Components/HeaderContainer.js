import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../css/default.css';
import MainImg from '../img/Main.png';

const HeaderNavigation = {marginTop: "40px", marginBottom: "40px", width: "100%", background:"rgb(250,250,250)", display: "flex", 
flexDirection:"column",alignItems: "center", justifyContent:"center"};
const HeaderInnerStyle = {width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "space-between"};

class MainCard extends Component {
    render() {
        return (
            <div>
                {
                    (this.props.Content == "Main")?(
                    <Container style={HeaderNavigation}>
                        <Box style={HeaderInnerStyle}>
                            <img src={MainImg} style={{width: "145px"}}/> 
                            <Typography variant="h3" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                {this.props.Title}
                            </Typography>
                            <Box style={{width:"145px", height:"1px"}}></Box>
                        </Box>
                    </Container>):
                    (
                    <Link to="/manage/">
                        <Container style={HeaderNavigation}>
                            <Box style={HeaderInnerStyle}>
                            <img src={MainImg} style={{width: "145px"}}/> 
                            <Typography variant="h3" style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                {this.props.Title}
                            </Typography>
                            <Box style={{width:"145px", height:"1px"}}></Box>
                            </Box>
                        </Container>
                    </Link>
                    )
                }
            </div>
        );
    }
}
  

export default MainCard;
