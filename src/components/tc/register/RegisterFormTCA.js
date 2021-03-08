import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";
import logo from "../../../assets/HELPLOGO.png"

const useStyles = makeStyles((theme) => ({
    button: {
        height: 50
    },
}));

const RegisterFormTCA = (props) => {
    const classes = useStyles();

    //todo: add another password field
    return (
        <Grid container justify={'center'} direction={'column'}
              spacing={2}>
            <Grid item align="center">
                <TextField
                    fullWidth
                    id="firstname"
                    name="firstname"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    required
                    value={props.firstname}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item align="center">
                <TextField
                    fullWidth
                    id="lastname"
                    name="lastname"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    required
                    value={props.lastname}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item align="center">
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="text"
                    label="Email Address"
                    variant="outlined"
                    required
                    value={props.email}
                    onChange={props.handleChange}
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
                    required
                    value={props.password}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item align="center">
                <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    type="text"
                    label="Phone Number"
                    variant="outlined"
                    required
                    value={props.phone}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item align="center">
                <TextField
                    fullWidth
                    id="company"
                    name="company"
                    type="text"
                    label="Company"
                    variant="outlined"
                    required
                    value={props.company}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item align="center">
                <Button color="primary" fullWidth type="submit" variant="contained" className={classes.button}>
                    Register
                </Button>
            </Grid>
        </Grid>
    )
}

export default RegisterFormTCA;