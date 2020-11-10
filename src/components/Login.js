import React, {useContext, useEffect, useRef, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Form from "react-validation/build/form";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import CheckButton from "react-validation/build/button";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import AuthService from "../auth.service";
import {Redirect, useHistory} from 'react-router-dom';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [user, setUser] = useState(' ')
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState();


    const [userSub, setUserSub] = useState({
        email: '',
        password: '',
    }); //

    function handleChange(e) {
        const {name, value} = e.target;
        setUserSub(user => ({...user, [name]: value}));
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const isLoggedIn = localStorage.getItem("loggedIn");
        if (loggedInUser && isLoggedIn) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            setLoggedIn(true)
            setAccessToken(foundUser.accessToken)
            return <Redirect to="/profile"/>;
        }
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: 'url(https://www.newhorizonsmessage.com/wp-content/uploads/2019/11/images2922-5dc4b874efb4f-1024x577.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
    }));

    const classes = useStyles();

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(userSub).then(
                (res) => {
                    setTimeout(() => {
                        console.log(res)
                        setUser(JSON.stringify(res))
                        setAccessToken(res.accessToken)
                        localStorage.setItem("user", JSON.stringify(res));
                        localStorage.setItem('accessToken', res.accessToken)
                        props.history.push('/profile')
                    }, 1000);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <Grid container className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Form onSubmit={handleLogin} ref={form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={userSub.email}
                            onChange={handleChange}
                            validations={[required]}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userSub.password}
                            onChange={handleChange}
                            validations={[required]}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}

                        >
                            Sign In
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href={"/forgot"} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={"/register"} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>

                        </Box>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                    </Form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Login;