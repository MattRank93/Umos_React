import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch , connect} from "react-redux";
import {logout} from "../actions/auth";
import {Button} from "@material-ui/core";
import store from "../store"


const Profile = (props) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    let name = user.firstname;

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <div className="container">
            <Button variant="contained" color="primary" onClick={logOut}>
                Logout
            </Button>
            {name}
        </div>
    );
};

export default Profile;