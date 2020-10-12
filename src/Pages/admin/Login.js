import React, { Component } from 'react';
import { Box, Button, TextField } from '@material-ui/core';

class Login extends Component {

    state = {
        password: new String()
    }

    onTextFieldChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = () => {
        if (this.state.password == 'grp3925') {
            window.sessionStorage.setItem("admin", "Y");
            window.location.replace("/manage/");
        } else {
            alert("올바르지 않은 비밀번호입니다.");
        }
    }

    onHandleEnterPress = (e) => {
        if (e.key == "Enter") {
            this.onSubmit();
        }
    }

    render() {

        const outBox = { width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", padding: "50px", boxSizing: "border-box" };

        return (
            <Box style={outBox}>
                <Box>
                    <TextField
                        id='password'
                        value={this.state.password}
                        label="비밀번호"
                        type="password"
                        helperText="비밀번호를 입력하세요."
                        variant="outlined"
                        style={{ width: "500px" }}
                        onKeyDown={this.onHandleEnterPress}
                        onChange={this.onTextFieldChange}
                    />
                </Box>
            </Box>
        );
    }
}

export default Login;
