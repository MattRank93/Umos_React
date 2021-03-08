import React, {useRef, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Form from "react-validation/build/form";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
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
import {login} from "../../actions/auth";
import Image from "../Image";
import {AppBar, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    root2: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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

const LoginPDU = (props) => {
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
        <div>
            <AppBar position="static" style={{
                flexDirection: "row",
                justifyContent: "flex-end"
            }}>
                <Toolbar>

                    {/*<button onClick={(e) => router.push('/about')}>About</button>*/}
                    <Button color="inherit" aria-label="menu" href={"/pdadminlogin"}>ADMIN</Button>

                </Toolbar>
            </AppBar>
            <Grid container className={classes.root} alignItems={'center'} justify={'center'}>
                <CssBaseline/>
                <Grid item component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Grid container direction={'column'}>
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    UID
                                </Typography>
                                <Form onSubmit={handleLogin} ref={form}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userlogin"
                                        label="User LoginPDU"
                                        name="email"
                                        autoComplete="username"
                                        autoFocus
                                        value={userSub.email}
                                        onChange={handleChange}
                                        validations={[required]}
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
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginPDU;