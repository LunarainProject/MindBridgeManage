import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Typography, Chip, Radio, RadioGroup } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, ArrowBackIos, ArrowForwardIos, LineWeight } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class ProblemType2 extends React.Component {

    constructor(props) {
        super(props)
        this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_0");
    }

    componentDidMount() {
        this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_0");
    }

    handleChange = (e) => {
        console.log(e.target.value + "");
    }
    render() {
        const { onChangeHandler } = this.props;
        let radioName = (this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1);

        const OutStyle = {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "20px",
            fontWeight: "500"
        }

        const InsideStyle = {
            background: "rgb(245,245,245)",
            width: "90vw",
            height: "11.5vh",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column"
        }

        const ExpressTypo = {
            padding: "5px",
            textAlign: "left",
            wordBreak: "keep-all"
        }

        const TopBox = {
            width: "90vw",
            height: "6vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        const BottomBox = {
            width: "90vw",
            height: "5vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        const NameBox = {
            width: "20vw",
            height: "8vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        const ObjectBox = {
            width: "20vw",
            height: "8vh",
            display: "flex",
            wordBreak: "break-all",
            justifyContent: "center",
            alignItems: "center"
        }

        const BackgroundBox = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            width: "84vw",
            height: "4vh",
            borderRadius: "20px"
        }

        return (
            <Box style={OutStyle}>
                <Typography variant="h6" style={ExpressTypo} >
                    <Box style={{ fontSize: "0.8em" }}>
                        {this.props.title}
                    </Box>
                </Typography>
                <Box style={InsideStyle} boxShadow={1}>
                    <Box style={TopBox}>
                        {
                            this.props.question.map((val, index) => (
                                <Box style={ObjectBox} key={radioName + "_name2_" + (index + 1)}>
                                    <Typography variant="h7">
                                        <Box style={{ fontSize: "0.7em" }}>
                                            {val}
                                        </Box>
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box style={BottomBox}>
                        <FormControl component="fieldset">
                            <RadioGroup>
                                <Box style={BackgroundBox}>
                                    {
                                        this.props.question.map((val, index) => (
                                            <Box style={ObjectBox} key={radioName + "_" + (index + 1)}>
                                                <FormControlLabel control={<Radio size="medium" color="primary" className="MuiSvgIcon-root" />} onChange={onChangeHandler} value={radioName + "_" + (index + 1)} name={radioName} style={{ margin: 0 }} />
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default ProblemType2;