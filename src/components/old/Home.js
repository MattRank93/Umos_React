import React from "react";
import {useDispatch} from "react-redux";
import { Button } from "@material-ui/core"
import {logout} from "../../actions/auth";

const Home = () => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout);
    };

  return (
    <div className="container">
        <Button variant="contained" color="primary" onClick={logOut}>
            Logout
        </Button>
    </div>
  );
};

export default Home;
