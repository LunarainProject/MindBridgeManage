import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Typography, Chip, Radio, RadioGroup } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, ArrowBackIos, ArrowForwardIos, LineWeight } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class ProblemType3 extends React.Component {

    constructor(props) {
        super(props)
        this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_0");
    }

    handleChange = (e) => {
        console.log(e.target.value + "");
        console.log(e.target.checked + "");
    }

    componentDidMount() {
        this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_0");
    }
    render() {

        const { onChangeHandler } = this.props;

        let radioName = (this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1);

        const OutStyle = {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "20px",
            paddingBottom: "40px", 
            fontWeight: "500"
        }

        const InsideStyle = {
            background: "rgb(245,245,245)",
            width: "90vw",
            height: "11.5vh auto",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            paddingTop: "1vh",
            paddingBottom: "5vh"
        }

        const ExpressTypo = {
            padding: "20px",
            marginBottom: "2vh",
            textAlign: "left",
            wordBreak: "keep-all"
        }

        const TopBox = {
            width: "90vw",
            height: "6vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "raw"
        }

        const BottomBox = {
            width: "90vw",
            height: "5vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }

        const NameBox = {
            width: "20vw",
            height: "8vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }

        const ObjectBox = {
            width: "100%",
            height: "8vh",
            display: "flex",
            wordBreak: "break-all",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "10px"
        }

        const BackgroundBox = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            width: "77vw",
            height: "4vh",
            borderRadius: "20px"
        }
        const rightBox = {
            width: "66vw", height: "6vh", display: "flex", justifyContent: "flex-start", alignItems: "center"
        }

        const valBox = (val) => {
            return <Box style={{lineHeight: "150%", height: "28px" }} >{val}</Box>;
        }

        return (
            <Box style={OutStyle}>
                <Typography variant="h6" style={ExpressTypo} >
                    {this.props.title}
                </Typography>

                <FormControl component="fieldset">
                    <RadioGroup>
                        <Box style={InsideStyle} boxShadow={1}>
                            {
                                this.props.question.map((val, index) => (
                                    <Box style={{ width: "90vw", height: "6vh", background: "#00000000", display: "flex", flexDirection: "raw" }}
                                     key={radioName + "_" + val + index}>

                                        <Box style={ObjectBox}>
                                            <FormControlLabel label={valBox(val)} control={<Radio lab size="medium" color="primary" className="MuiSvgIcon-root" />} 
                                            onChange={onChangeHandler} value={radioName + "_" + (index + 1)} name={radioName} style={{ margin: 0 }} />
                                        </Box>

                                    </Box>
                                ))
                            }

                        </Box>
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }
}

export default ProblemType3;