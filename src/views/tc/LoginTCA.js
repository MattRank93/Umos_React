import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CssBaseline, Hidden, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Navigation from "../../components/tc/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../actions/auth";
import {Redirect} from "react-router-dom";
import LoginFormTCA from "../../components/tc/login/LoginFormTCA";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    media: {
        objectFit: "cover",
        textAlign: "center",
        width: "100%",
        display: "block",
        padding: 0,
    },
    button: {
        height: 50
    },
    infoBoxXs: {
        flexGrow: 1,
        marginTop: 170,
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
    },
    infoBoxSm: {
        borderRadius: 15,
        padding: 25,
        boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.2)",
    },
    div: {
        flexGrow: 1,
        position: 'absolute',
        left: '50%',
        width: 400,
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const LoginTCA = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth);
    const [message, setMessage] = useState(null)


    const [submit, setSubmit] = useState({
        email: '',
        password: '',
        platform: "ROLE_TCADMIN"
    });

    const handlePress = (href) => {
        props.history.push(href);
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setSubmit(user => ({...user, [name]: value}));
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        dispatch(await login(submit))
            .then((e) => {
                this.props.history.push("/home");
            })
            .catch((err) => {
                console.log(err)
                setMessage(err)
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/tc/home"/>; //
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Navigation login/>

                <Hidden xsDown>
                    <div className={classes.div}>
                        <Container>
                            <Card className={classes.infoBoxSm}>
                                <Typography variant={'h5'} style={{paddingBottom: 15}}>
                                    Login
                                </Typography>
                                <form onSubmit={handleLogin}>
                                    <LoginFormTCA
                                        email={submit.email}
                                        password={submit.password}
                                        handleChange={handleChange}
                                    />
                                </form>
                                <Typography variant={'h5'} align={'right'}>
                                    <Button onClick={() => handlePress("/tc/forgot")} variant={"subtitle1"}>
                                        Forgot Password?
                                    </Button>
                                </Typography>
                                <Typography >
                                    {message ? message : ''}
                                </Typography>
                            </Card>
                        </Container>
                    </div>
                </Hidden>

                <Hidden smUp>
                    <div className={classes.infoBoxXs}>
                        <Container>
                            <Typography variant={'h5'} style={{paddingBottom: 15}}>
                                Login
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <LoginFormTCA
                                    email={submit.email}
                                    password={submit.password}
                                    handleChange={handleChange}
                                />
                            </form>
                            <Typography variant={'h5'} align={'right'}>
                                <Link onClick={() => handlePress("/tc")} variant={"subtitle1"}>
                                    Forgot Password?
                                </Link>
                            </Typography>
                            <Typography >
                                {message ? message : ''}
                            </Typography>
                        </Container>
                    </div>
                </Hidden>
            </main>
        </React.Fragment>
    )
}

export default LoginTCA;