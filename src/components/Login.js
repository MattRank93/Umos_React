import React, {useRef, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Form from "react-validation/build/form";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import CheckButton from "react-validation/build/button";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PolicyTwoToneIcon from '@material-ui/icons/PolicyTwoTone';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {login} from "../actions/auth";
import Image from "../Image";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://wallpapercave.com/wp/wp2405396.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(4, 4),
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
        margin: theme.spacing(2)
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

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [userSub, setUserSub] = useState({
        email: '',
        password: '',
    }); //

    function handleChange(e) {
        const {name, value} = e.target;
        setUserSub(user => ({...user, [name]: value}));
    }

    const classes = useStyles();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(await login(userSub))
                .then(() => {

                    this.props.history.push("/profile");
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/profile"/>;
    }

    return (
        <Grid container className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Image src='./Background.png' mode={'fit'} height={62} width={357} style={{marginBottom: 10}}/>
                    <Avatar className={classes.avatar}>
                        <PolicyTwoToneIcon/>
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