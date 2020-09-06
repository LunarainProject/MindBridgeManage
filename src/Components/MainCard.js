import React, {Component} from 'react';
import { Button, Box, Container, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../css/default.css';

const ContainerStyle = {width: "100%", height: "173px", background: "#ffffff", borderRadius: "10px", boxSizing: "border-box"
,display: "flex", flexDirection: "column",};

const TitleTextStyle = {fontWeight: "700"};
const TextMargin = {marginTop: "37px"};

class MainCard extends Component {
    render() {
        return (
            <div>
                <Card style={ContainerStyle} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h2" style={TitleTextStyle}>
                                {this.props.Title}
                            </Typography>
                            <Typography variant="h5" style={TextMargin}>
                                {this.props.SubTitle}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
  

export default MainCard;
