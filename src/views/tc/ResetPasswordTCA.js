import React, {useState} from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StepContent from "@material-ui/core/StepContent";
import PasswordService, {forgot, reset, verify} from "../../services/password.service"
import Navigation from "../../components/tc/Navigation";
import Container from "@material-ui/core/Container";
import {Card} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
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
        width: 500,
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(2, 0, 2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const ResetPasswordTCA = (props) => {

    const [userSub, setUserSub] = useState({
        email: '',
        verifyToken: '',
        newPassword: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setUserSub(user => ({...user, [name]: value}));
    }


    function getSteps() {
        return ['Input the email associated with your account',
            'Input the code sent to the provided email ',
            'Choose a new password'];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Typography variant="h6">
                            Account Email
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="given-name"
                                    autoFocus
                                    value={userSub.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                );
            case 1:
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Verify Token
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    id="token"
                                    name="token"
                                    label="Token"
                                    fullWidth
                                    autoComplete="given-name"
                                    value={userSub.verifyToken}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                );
            case 2:
                return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Change Password
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    id="password"
                                    name="password"
                                    label="password"
                                    fullWidth
                                    autoComplete="given-name"
                                    autoFocus
                                    value={userSub.newPassword}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                );
            default:
                throw new Error('Unknown step');
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        switch (activeStep) {
            case 0:
                PasswordService.forgot(userSub.email)
                    .then((res) => {
                        if (res === 200) {
                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        }
                    })
                    .catch(() => {
                        alert("Error: Invalid Entry")
                    });
                break;
            case 1:
                PasswordService.verify(userSub.email, userSub.verifyToken)
                    .then((res) => {
                        if (res === 200) {
                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        }
                    })
                    .catch(() => {
                        alert("Error: Invalid Entry")
                    });
                break;
            case 2:
                PasswordService.reset(userSub.email, userSub.verifyToken, userSub.newPassword)
                    .then((res) => {
                        if (res === 200) {
                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        }
                    })
                    .catch(() => {
                        alert("Error: Invalid Entry")
                    });
                break;
            default:
                setActiveStep(0);
        }
    };

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Navigation register/>
                <div className={classes.div}>
                    <Container>
                        <Card className={classes.infoBoxSm}>
                            <Typography variant={'h5'} style={{paddingBottom: 15}}>
                                Reset Password
                            </Typography>
                            <Stepper activeStep={activeStep} className={classes.stepper} orientation="vertical">
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            <Typography>{getStepContent(index)}</Typography>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            <React.Fragment>
                                {activeStep === steps.length ? (
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            Password reset has completed.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Your password has been changed to the new password.
                                            Thank you for using our service.
                                        </Typography>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <div className={classes.buttons}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Change Password' : 'Next'}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        </Card>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}

export default ResetPasswordTCA;