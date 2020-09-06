import React, {Component} from 'react';
import {Button, Box, AppBar, Toolbar, IconButton, Typography, Chip, Radio, RadioGroup} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation,ArrowBackIos, ArrowForwardIos, LineWeight } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class ProblemType1 extends React.Component {

  constructor(props){
    super(props)
    this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_1_0");
    this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_2_0");
  }
  componentDidMount(){
    this.props.ChangeAuto((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_1_0");
    this.props.ChangeAuto((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_2_0");
  }

  handleChange = (e) => {

    let arrayList = new Array();
    
    console.log(e.target.value + "");
    arrayList = (e.target.value).split("_");

    this.state.content[arrayList[0] + "_" + arrayList[1] + "_" + arrayList[2]] = arrayList[3];
    console.log(this.state.content);
  }

  state = {
    content: new Array(),
  }

  render(){
    let radioName = (this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) ;

    const OutStyle = {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "20px", 
      fontWeight: "500"
    }

    const InsideStyle = {
      background:"rgb(245,245,245)",
      width: "90vw",
      height: "17vh",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column"
    }
    
    const ExpressTypo = {
      padding: "50px", 
      paddingTop: "40px",
      paddingBottom: "40px",
      textAlign: "left", 
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
      width: "16vw",
      height: "5vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }

    const ObjectBox = {
      width: "16vw",
      height: "5vh",
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
      width: "72vw",
      height: "4vh",
      borderRadius: "20px"
    }
    
    return (
      <Box style={OutStyle}>
        <Typography variant="h6" style={ExpressTypo} >
            {this.props.title}
        </Typography>
        <Box style={InsideStyle} boxShadow ={1}>
          <Box style={TopBox}>
            <Box style={NameBox}>
            </Box>
          {
            this.props.question.map((val, index)=>(
              <Box style={ObjectBox}  key={radioName+"_name_"+(index+1) }>
                <Typography variant="h7">
                  {val}
                </Typography>
              </Box>
            ))
          }
          </Box>
          <Box style={BottomBox}>
            <Box style={NameBox}>
              <Typography variant="h7">
                {this.props.coupleList[0]}
              </Typography>
            </Box>
            <FormControl component="fieldset">
              <RadioGroup>
                <Box style ={BackgroundBox}>
                  {
                    this.props.question.map((val, index)=>(
                      <Box style={ObjectBox} key={radioName+"_1_"+(index+1)}>
                        <FormControlLabel control={<Radio size="medium" color="primary" className="MuiSvgIcon-root" />} onChange={this.props.onChangeHandler} value={radioName+"_1_"+(index+1)} style={{margin:0}} />
                      </Box>
                    ))
                  }
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box style={BottomBox}>
            <Box style={NameBox}>
              <Typography variant="h7">
                {this.props.coupleList[1]}
              </Typography>
            </Box>
            <FormControl component="fieldset">
              <RadioGroup>
                <Box style ={BackgroundBox}>
                  {
                    this.props.question.map((val, index)=>(
                      <Box style={ObjectBox} key={radioName+"_2_"+(index+1)}>
                        <FormControlLabel control={<Radio color="primary" />} onChange={this.props.onChangeHandler}  value={radioName+"_2_"+(index+1)} style={{margin:0}} />
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

export default ProblemType1;