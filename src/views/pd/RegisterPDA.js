import React, {useRef, useState} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import AuthService from "../../services/auth.service";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {AppBar, Toolbar} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    help: {
        margin: theme.spacing(0, 0, 2)
    }
}));

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const RegisterPDA = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const [userSub, setUserSub] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setUserSub(user => ({...user, [name]: value}));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(userSub).then(
                (response) => {
                    setMessage("Success!");
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" style={{
                flexDirection: "row",
                justifyContent: "flex-end"
            }}>
                <Toolbar>

                    {/*<button onClick={(e) => router.push('/about')}>About</button>*/}
                    <Button color="inherit" aria-label="menu" href={"/pduserlogin"}>User Login</Button>

                </Toolbar>
            </AppBar>
            <Grid container className={classes.root} alignItems={'center'} justify={'center'}>
                <CssBaseline/>
                <Grid item component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Grid container direction={'column'}>
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Admin Registration
                                </Typography>
                                <Form onSubmit={handleRegister} ref={form}>
                                    {!successful && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="fname"
                                                    name="firstName"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    autoFocus
                                                    value={userSub.firstName}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    autoComplete="lname"
                                                    value={userSub.lastName}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={userSub.email}
                                                    onChange={handleChange}
                                                    validations={[required, validEmail]}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    value={userSub.password}
                                                    onChange={handleChange}
                                                    validations={[required, vpassword]}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Confirm Password"
                                                    type="password"
                                                    id="password"
                                                    value={userSub.password}
                                                    onChange={handleChange}
                                                    validations={[required, vpassword]}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="phone"
                                                    label="Phone"
                                                    type="phone"
                                                    id="phone"
                                                    autoComplete="phone"
                                                    value={userSub.phone}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Sign Up
                                            </Button>
                                        </Grid>
                                    )}
                                    <Grid container justify="left">
                                        <Grid item>
                                            <Link href={"/pd"} variant="body2">
                                                Already have an admin account? Sign in
                                            </Link>

                                        </Grid>

                                    </Grid>
                                    <Grid container justify="right">
                                        <Grid item>
                                            <Link href={"/pduserlogin"} variant="body2">
                                                Already have an User account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    {message && (
                                        <div className="form-group">
                                            <div
                                                className={
                                                    successful ? "alert alert-success" : "alert alert-danger"
                                                }
                                                role="alert"
                                            >
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                                </Form>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default RegisterPDA;
