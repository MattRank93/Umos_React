import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CssBaseline, Grid, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Navigation from "../components/home/Navigation";
import logo from "../assets/HELPLOGO.png"
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/auth";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    media: {
        objectFit: "cover",
        textAlign: "center",
        width: "100%",
        display: "block",
        padding: 0,
    },
    infoBoxXs: {
        flexGrow: 1,
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
    },
    button: {
      height: 50
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

const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth);

    const [submit, setSubmit] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setSubmit(user => ({...user, [name]: value}));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(submit)
        dispatch(await login(submit))
            .then(() => {
                this.props.history.push("/profile");
            })
            .catch(() => {
                console.log("Error")
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/profile"/>;
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Navigation login/>
                <div className={classes.div}>
                    <Container>
                        <Card className={classes.infoBoxSm}>
                            <form onSubmit={handleLogin}>
                                <Grid container justify={'center'} direction={'column'}
                                      spacing={2}>
                                    <Grid item align="center">
                                        <img src={logo} alt="Logo" height={40}/>
                                    </Grid>
                                    <Grid item align="center">
                                        <TextField
                                            fullWidth
                                            id="email"
                                            name="email"
                                            type="text"
                                            label="Email Address"
                                            variant="outlined"
                                            autoComplete="email"
                                            autoFocus
                                            required
                                            value={submit.email}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item align="center">
                                        <TextField
                                            fullWidth
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            autoComplete="password"
                                            autoFocus
                                            required
                                            value={submit.password}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item align="center">
                                        <Button
                                            color="primary"
                                            fullWidth
                                            type="submit"
                                            className={classes.button}
                                            variant="contained">
                                            Sign In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Login;