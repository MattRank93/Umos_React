import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch , connect} from "react-redux";
import {logout} from "../actions/auth";
import {Button} from "@material-ui/core";
import store from "../store"
import {Redirect} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PopOverButton from "./tc/PopOverButton";
import GoogleMapSDK from "./MapsSDK";


const Profile = (props) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    let name = user.firstname;

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <div className="container" >
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        justify="space-between" // Add it here :)
                        container
                        spacing={24}
                    >
                        <Typography variant="h6" >HELP Dashboard</Typography>
                        <PopOverButton user={user} />
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Profile;