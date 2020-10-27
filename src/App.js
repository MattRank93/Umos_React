import React from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

class App extends React.Component {

    state = {
        email: '',
        pass: '',
        suFirstname: '',
        suLastname: '',
        suEmail: '',
        suPassword: ''
    }

    changeEmailField = event => {
        this.setState({email: event.target.value});
    }

    changePassField = event => {
        this.setState({pass: event.target.value});
    }

    changeStuffField = event => {
        this.setState({stuff: event.target.value});
    }

    changeSuFirstnameField = event => {
        this.setState({suFirstname: event.target.value});
    }

    changeSuLastnameField = event => {
        this.setState({suLastname: event.target.value});
    }

    changeSuEmailField = event => {
        this.setState({suEmail: event.target.value});
    }

    changeSuPasswordField = event => {
        this.setState({suPassword: event.target.value});
    }

    signIn = event => {
        event.preventDefault();

        if (this.state.user === '' || !this.state.email.includes('@')) {
            return alert("Missing Email or incorrect format");
        }
        if (this.state.pass === '') {
            return alert("Missing Password");
        }

        const user = {
            "email": this.state.email,
            "password": this.state.pass
        };

        axios.post(`https://help-spring-api.herokuapp.com/api/users/login`, {"body": ""}, {headers: user})
            .then(res => {
                alert(JSON.stringify(res));
            })
            .catch(err => {
                alert(err)
            })

    }

    signUp = event => {
        event.preventDefault();

        const suUser = {
            "firstname": this.state.suFirstname,
            "lastname": this.state.suLastname,
            "email": this.state.suEmail,
            "password": this.state.suPassword
        };

        console.log(this.state.suEmail)

        axios.post(`https://help-spring-api.herokuapp.com/api/users/registeruser`, {"body": ""}, {headers: suUser})
            .then(res => {
                alert(JSON.stringify(res));
            })
            .catch(err => {
                alert(suUser.email + suUser.password + suUser.firstname + suUser.lastname)
                alert("Error: " + err)
            })

    }//

    render() {
        return (
            <div className="App">

                <Grid
                    container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: '100vh'}}
                >
                    <Router>
                        <div className="App">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact Us</Link>
                                </li>
                            <Switch>
                                <Route exact path='/' component={Home}></Route>
                                <Route exact path='/about' component={About}></Route>
                                <Route exact path='/contact' component={Contact}></Route>
                            </Switch>
                        </div>
                    </Router>
                    <Grid item xs={6} sm={3}>
                        <FormGroup>
                            <FormLabel focused={true}>Sign Into Cool API</FormLabel>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"user"}>Email</InputLabel>
                                <Input id={"user"} onChange={this.changeEmailField}>tes</Input>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"pass"}>Password</InputLabel>
                                <Input id={"pass"} onChange={this.changePassField} type={"password"}>pass</Input>
                            </FormControl>
                            <FormControl>
                                <Button variant="contained" color="primary" onClick={this.signIn}>
                                    Log In
                                </Button>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormGroup>
                            <FormLabel focused={true}>Sign Up To Cool API</FormLabel>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"suUser"}>Firstname</InputLabel>
                                <Input id={"suUser"} onChange={this.changeSuFirstnameField}>tes</Input>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"suUser"}>Lastname</InputLabel>
                                <Input id={"suUser"} onChange={this.changeSuLastnameField}>tes</Input>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"suUser"}>Email</InputLabel>
                                <Input id={"suUser"} onChange={this.changeSuEmailField}>tes</Input>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"suUser"}>Password</InputLabel>
                                <Input id={"suUser"} onChange={this.changeSuPasswordField} type={"password"}>pass</Input>
                            </FormControl>
                            <FormControl>
                                <Button variant="contained" color="primary" onClick={this.signUp}>
                                    Sign Up
                                </Button>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                </Grid>
            </div>
        )

    }
}

export default App;
