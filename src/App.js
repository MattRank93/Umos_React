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
        pass: ''
    }

    changeEmailField = event => {
        this.setState({ email: event.target.value });
    }

    changePassField = event => {
        this.setState({ pass: event.target.value });
    }

    signUp = event => {
        return alert("Not Implemented");


        if (this.state.email === '' || !this.state.email.includes('@')) {
            return alert("Missing Username or incorrect format");
        }
        if (this.state.pass === '') {
            return alert("Missing Password");
        }
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

        axios.post(`https://help-spring-api.herokuapp.com/api/users/login`,{"body":""}, { headers: user })
            .then(res => {
                alert("Successful Login");
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("Error Logging in")
            })

    }

    render() {
        return(
            <div className="App">
                {/*<Router>*/}
                {/*    <div className="App">*/}
                {/*            <li>*/}
                {/*                <Link to="/">Home</Link>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <Link to="/about">About Us</Link>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <Link to="/contact">Contact Us</Link>*/}
                {/*            </li>*/}
                {/*        <Switch>*/}
                {/*            <Route exact path='/' component={Home}></Route>*/}
                {/*            <Route exact path='/about' component={About}></Route>*/}
                {/*            <Route exact path='/contact' component={Contact}></Route>*/}
                {/*        </Switch>*/}
                {/*    </div>*/}
                {/*</Router>*/}

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: '100vh'}}
                >
                    <Grid item xs={3}>
                        <FormGroup>
                            <FormLabel focused={true}>Sign Into Cool Guy Quincy's API</FormLabel>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"user"}>Email</InputLabel>
                                <Input id={"user"} onChange={this.changeEmailField}>tes</Input>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <InputLabel htmlFor={"pass"} >Password</InputLabel>
                                <Input id={"pass"} onChange={this.changePassField} type={"password"}>pass</Input>
                            </FormControl>
                            <FormControl margin={"normal"}>
                                <Button variant={"outlined"} color="primary" onClick={this.signUp}>
                                    Sign Up
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button variant="contained" color="primary" onClick={this.signIn} >
                                    Log In
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
