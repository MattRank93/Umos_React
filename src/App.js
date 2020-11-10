import React, {useState} from 'react';
import {BrowserRouter, Router, Route} from 'react-router-dom';
import { AuthContext } from "./auth";
import PrivateRoute from './PrivateRoute';
import {history} from './helpers/history'
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import './App.css';

const App = () => {
    const [accessToken, setAccessToken] = useState();

    const setToken = (data) => {
        localStorage.setItem("accessToken", JSON.stringify(data));
        setAccessToken(data);
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken: setToken }}>
            <Router history={history}>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/reset" component={ResetPassword} />
                <PrivateRoute path="/profile" component={Profile} />
            </Router>
        </AuthContext.Provider>
    );
}

export default App;