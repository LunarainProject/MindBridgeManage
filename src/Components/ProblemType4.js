import React, { Component } from 'react';
import { Button, Box, AppBar, Toolbar, IconButton, Typography, Chip, Radio, RadioGroup } from '@material-ui/core';
import { AccessAlarm, ThreeDRotation, ArrowBackIos, ArrowForwardIos, LineWeight } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class ProblemType1 extends React.Component {

  constructor(props) {
    super(props)
    this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_1_0");
    this.props.onCreate((this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1) + "_2_0");
  }
  componentDidMount() {
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

  render() {
    let radioName = (this.props.pagenumber + 1) + "_" + (this.props.problemnumber + 1);

    const OutStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "5px",
      fontWeight: "500"
    }

    const InsideStyle = {
      padding: "5%",
      paddingRight: "2%",
      paddingBottom: "1%",
      paddingTop: "1%",
      background: "rgb(245,245,245)",
      width: "80vw",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border"
    }
    const ExpressTypo = {
      padding: "5px",
      textAlign: "left",
      wordBreak: "keep-all",
      marginLeft: "5px"
    }

    const ObjectBox = {
      height: "50px",
      display: "flex",
      wordBreak: "break-all",
      justifyContent: "center",
      alignItems: "center"
    }


    return (
      <Box style={OutStyle}>
        <Typography variant="h6" style={ExpressTypo} >
          <Box style={{ fontSize: "0.8em" }}>
            {this.props.title}
          </Box>
        </Typography>
        <Box style={InsideStyle} boxShadow={1}>
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ width: "70%", display: "flex", flexDirection: "column" }}>
              <Box>
                <Typography variant="h7" style={{ width: '100%' }}>
                  <Box style={{ fontSize: "0.7em", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    &nbsp;
                  </Box>
                </Typography>
              </Box>
              <Box>
                {
                  this.props.question.map((val, index) => (
                    <Box style={ObjectBox} key={radioName + "_name_" + (index + 1)}>
                      <Typography variant="h6" style={{ lineHeight: "210%" }}>
                        <Box style={{ fontSize: "0.7em" }}>
                          {val}
                        </Box>
                      </Typography>
                    </Box>
                  ))
                }
              </Box>
            </Box>
            <Box style={{ width: "30%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box style={{ display: 'flex', flexDirection: "column" }}>
                <Typography variant="h7" style={{ width: '100%' }}>
                  <Box style={{ fontSize: "0.7em", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    {this.props.coupleList[0]}
                  </Box>
                </Typography>
                <Box style={{
                  background: "#ff5486", display: "flex",
                  flexDirection: "column", background: "#fff", borderRadius: "20px",
                }}>
                  <FormControl component="fieldset">
                    <RadioGroup>
                      {
                        this.props.question.map((val, index) => (
                          <Box style={ObjectBox} key={radioName + "_1_" + (index + 1)}>
                            <FormControlLabel control={<Radio size="medium" color="primary" className="MuiSvgIcon-root" />} onChange={this.props.onChangeHandler} value={radioName + "_1_" + (index + 1)} style={{ margin: 0 }} />
                          </Box>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>

              <Box style={{ display: 'flex', flexDirection: "column" }}>
                <Typography variant="h7" style={{ width: '100%' }}>
                  <Box style={{ fontSize: "0.7em", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    {this.props.coupleList[1]}
                  </Box>
                </Typography>
                <Box style={{
                  background: "#123468", display: "flex",
                  flexDirection: "column", background: "#fff", borderRadius: "20px"
                }}>

                  <FormControl component="fieldset">
                    <RadioGroup>
                      {
                        this.props.question.map((val, index) => (
                          <Box style={ObjectBox} key={radioName + "_2_" + (index + 1)}>
                            <FormControlLabel control={<Radio color="primary" />} onChange={this.props.onChangeHandler} value={radioName + "_2_" + (index + 1)} style={{ margin: 0 }} />
                          </Box>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ProblemType1;