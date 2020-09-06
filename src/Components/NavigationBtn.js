import React, {Component} from 'react';
import {Button, Box, AppBar, Toolbar, IconButton, Typography, Chip, Radio, RadioGroup, FormControl, Snackbar, Fade} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation,ArrowBackIos, ArrowForwardIos, LineWeight } from '@material-ui/icons';
import '../css/default.css';

class NavigationBtn extends React.Component {

  state = {
    count: 0,
    open: false,
    close: true, 
  }

  CheckObjectInZero = () => {
    
    let check = true;

    for(var i in this.props.CheckObject){
      if(this.props.CheckObject[i] == 0){
        check = false;
      }
    }

    if(check){
      this.props.PlusonClickHandler();
    }else{
      this.setState({
        open: true, close: false
      })
      setTimeout(() => {
        this.setState({
          open: false, close: true,
        })
      },1000)
    }
  }
  
  render(){
    const FirstBoxStyle = {
      position: "fixed",
      width: "100vw", 
      height: "15vh", 
      bottom:"0", 
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
    const SecondBoxStyle = {
      display: "flex",
      justifyContent: "center", 
      width: "90vw", 
      height: "10vh", 
      bottom:"0"
    }
    const BtnBoxStyle = {
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }
    const WhiteBtn = {
      background:"rgb(245,245,245)",
      width: "43vw",
      height: "6vh",
      borderRadius: "5px"
    }
    const PinkBtn = {
      background:"#ffbad1",
      width: "43vw",
      height: "6vh",
      borderRadius: "5px"
    }
    const btnFont = {
      fontWeight: "550",
      marginTop: "2.1px",
      fontSize: "15px"
    }
    const { MinusonClickHandler} = this.props;

    return (
      <Box style={FirstBoxStyle}>
        <Box style={{display:"flex", flexDirection: "center", alignItems: "center"}}>
        <Snackbar 
          className="MuiPaper-elevation6 MuiSnackbarContent-root MuiSnackbarContent-message MuiSnackbar-anchorOriginBottomCenter MuiSnackbar-anchorOriginBottomCenter" 
          style={{width: "90vw", fontSize: "0.5em !important"}}
          open={this.state.open}
          onClose={this.state.open}
          message="입력되지 않은 문항이 있습니다."
          key={1}
        />
        </Box>
        <Box style={SecondBoxStyle}>
          <Box boxShadow = {1} style={{...WhiteBtn,marginRight:"1vw"}} >
          <Button style={WhiteBtn} onClick={MinusonClickHandler} >
            <Box style={BtnBoxStyle}>
              <ArrowBackIos fontSize="30px" />
              <Typography style={btnFont}>이전 문항</Typography>
            </Box>
          </Button>
          </Box>
          <Box boxShadow = {2} style={{...PinkBtn,marginLeft:"1vw"}} >
          <Button style={PinkBtn} onClick={this.CheckObjectInZero}>
            <Box style={BtnBoxStyle}>
              <Typography style={btnFont}>다음 문항</Typography>
              <ArrowForwardIos fontSize="30px" />
            </Box>
          </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default NavigationBtn;