import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CssBaseline, Hidden, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Navigation from "../../components/tc/Navigation";
import {useDispatch} from "react-redux";
import AuthService from "../../services/auth.service";
import RegisterFormTCA from "../../components/tc/register/RegisterFormTCA";

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

const RegisterTCA = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null)

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
                setMessage('User Registered');
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
                                <Typography variant={'h5'} style={{paddingBottom: 15}}>
                                    Register
                                </Typography>
                                <form onSubmit={handleRegister}>
                                    <RegisterFormTCA
                                        firstname={submit.firstname}
                                        lastname={submit.lastname}
                                        email={submit.email}
                                        password={submit.password}
                                        phone={submit.phone}
                                        company={submit.company}
                                        handleChange={handleChange}
                                    />
                                </form>
                                <Typography style={{marginTop: 15}}>
                                    {message ? message : ''}
                                </Typography>
                            </Card>
                        </Container>
                    </div>
                </Hidden>

                <Hidden smUp>
                    <div className={classes.infoBoxXs}>
                        <Container>
                            <Typography variant={'h5'}>
                                Register
                            </Typography>
                            <form onSubmit={handleRegister}>
                                <RegisterFormTCA
                                    firstname={submit.firstname}
                                    lastname={submit.lastname}
                                    email={submit.email}
                                    password={submit.password}
                                    phone={submit.phone}
                                    company={submit.company}
                                    handleChange={handleChange}
                                />
                            </form>
                            <Typography style={{marginTop: 15}}>
                                {message ? message : ''}
                            </Typography>
                        </Container>
                    </div>
                </Hidden>

            </main>
        </React.Fragment>
    )
}

export default RegisterTCA;