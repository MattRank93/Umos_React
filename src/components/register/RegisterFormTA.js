import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";
import logo from "../../assets/HELPLOGO.png";

const useStyles = makeStyles((theme) => ({}));

const X = (props) => {
    const classes = useStyles();


    return (
        <Grid container justify={'center'} direction={'column'}
              spacing={2}>
            <Grid item align="center">
                <img src={logo} alt="Logo" height={40}/>
            </Grid>
            <Grid item align="center">
                <TextField
                    fullWidth
                    id="firstname"
                    name="firstname"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    autoComplete="firstname"
                    autoFocus
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
                    autoComplete="lastname"
                    autoFocus
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
                    autoComplete="email"
                    autoFocus
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
                    autoComplete="password"
                    autoFocus
                    required
                    value={props.password}
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
                    autoComplete="password"
                    autoFocus
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
                    autoComplete="phone"
                    autoFocus
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
                    autoComplete="company"
                    autoFocus
                    required
                    value={props.company}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item align="center">
                <Button color="primary" fullWidth type="props" variant="contained">
                    Register
                </Button>
            </Grid>
        </Grid>
    )
}

export default X;