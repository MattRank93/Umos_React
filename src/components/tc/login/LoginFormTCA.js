import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";
import logo from "../../../assets/HELPLOGO.png"

const useStyles = makeStyles((theme) => ({
    button: {
        height: 50
    },
}));

const LoginFormTCA = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify={'center'} direction={'column'}
              spacing={2}>
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
                <Button color="primary" fullWidth type="submit" variant="contained" className={classes.button}>
                    Sign In
                </Button>
            </Grid>
        </Grid>
    )
}

export default LoginFormTCA;