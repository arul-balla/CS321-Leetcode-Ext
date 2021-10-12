import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            email: '',
            password: '',
            errors: {}
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData).then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            console.log("SUCCESS!");
        })
        .catch((error)=> {
            if (error.response.data.error === 'auth/invalid-email'){
                this.setState({
                    errors: {
                        email: "Invalid Email"
                    } 
                })
            }
            else if (error.response.data.general !== ''){
                this.setState({
                    errors: {
                        password: "Wrong Credentials, Please try again"
                    }
                })
            }
        })
    }
    

    render(){
        return(
            <div>
                <Button variant="contained" color = "primary" onClick={this.handleClickOpen}>
                    Login
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle style = {{fontSize: '28px'}}>
                        Login
                    </DialogTitle>
                    <DialogContent>
                    <form style = {{alignItems: 'center', padding: '1%'}} noValidate onSubmit = {this.handleSubmit}>
                        <TextField id = "email" 
                            name = "email" 
                            type = "email" 
                            label = "Email" 
                            size = "large"
                            style = {{width: '400px'}}
                            value = {this.state.email} 
                            onChange = {this.handleChange} 
                            helperText = {this.state.errors.email} 
                            error = {this.state.errors.email ? true: false}>
                        </TextField>
                        <br/>
                        <TextField 
                            id = "password" 
                            name = "password" 
                            type = "password" 
                            label = "Password" 
                            helperText = {this.state.errors.password} 
                            style = {{width: '400px'}}
                            error = {this.state.errors.password ? true:false}                                
                            value = {this.state.password} 
                            onChange = {this.handleChange}></TextField>
                        <br/>
                        <Button 
                            style = {{marginTop: '3%', left: '30%'}}
                            type = "submit" 
                            variant = "contained" 
                            color = "primary"
                            >Submit
                        </Button>
                        <br/>
                        <small style = {{paddingLeft: '15%', paddingTop: '2%'}}>Don't have an account? Sign Up here</small>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default Login;