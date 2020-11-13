import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Copyright} from "../elements/copyright";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StepContent from "@material-ui/core/StepContent";
import {forgot, verify, reset} from "../services/password.service"
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
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
        padding: theme.spacing(3, 0, 5),
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

const ResetPassword = (props) => {

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
                        <Typography variant="h6" gutterBottom>
                            Account Email
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="given-name"
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
                                    required
                                    id="token"
                                    name="token"
                                    label="Token"
                                    fullWidth
                                    autoComplete="given-name"
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
                                    required
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    fullWidth
                                    autoComplete="given-name"
                                />
                                <TextField
                                    required
                                    id="verifyPassword"
                                    name="verifyPassword"
                                    label="Verify Password"
                                    fullWidth
                                    autoComplete="given-name"
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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBackBrowser = () => {
        props.history.push('/')
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Grid
                            justify="space-between" // Add it here :)
                            container
                            spacing={24}
                        >
                            <Button variant="contained" color="secondary" onClick={handleBackBrowser}>
                                Back
                            </Button>
                            <Typography variant="h6" className={classes.title}>HELP Dashboard</Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
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
                    </Paper>
                    <Copyright/>
                </main>
            </React.Fragment>
        </div>
    );
}

export default ResetPassword;