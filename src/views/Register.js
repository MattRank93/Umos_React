import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CssBaseline, Grid, Hidden, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Navigation from "../components/home/Navigation";
import logo from "../assets/HELPLOGO.png"
import {useDispatch} from "react-redux";
import AuthService from "../services/auth.service";
import FormTA from "../components/register/RegisterFormTA";

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
    infoBoxSm: {
        borderRadius: 15,
        padding: 25,
        boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.2)",
    },
    infoBoxXs: {
        flexGrow: 1,
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
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

const Register = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [submit, setSubmit] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        company: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSubmit(user => ({...user, [name]: value}));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        AuthService.register(submit).then(
            (response) => {
                console.log(response)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage)
            }
        );
    };

    // todo: password validation
    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Navigation register/>

                <Hidden xsDown>
                    <div className={classes.div}>
                        <Container>
                            <Card className={classes.infoBoxSm}>
                                <form onSubmit={handleRegister}>
                                    <FormTA
                                        firstname={submit.firstname}
                                        lastname={submit.lastname}
                                        email={submit.email}
                                        password={submit.password}
                                        phone={submit.phone}
                                        company={submit.company}
                                        handleChange={handleChange}
                                    />
                                </form>
                            </Card>
                        </Container>
                    </div>
                </Hidden>

                <Hidden smUp>
                    <div className={classes.infoBoxXs}>
                        <Container>
                            <form onSubmit={handleRegister}>
                                <FormTA
                                    firstname={submit.firstname}
                                    lastname={submit.lastname}
                                    email={submit.email}
                                    password={submit.password}
                                    phone={submit.phone}
                                    company={submit.company}
                                    handleChange={handleChange}
                                />
                            </form>
                        </Container>
                    </div>
                </Hidden>

            </main>
        </React.Fragment>
    )
}

export default Register;