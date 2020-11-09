import React, {useEffect, useContext, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, Redirect,
  useHistory,
  useLocation } from 'react-router-dom';


import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Dashboard";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const authContext = createContext();
export const useAuth = () => {

  return useContext(authContext);

};

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  document.title = 'HELP Dashboard';

  function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                          pathname: "/login",
                          state: { from: location }
                        }}
                    />
                )
            }
        />
    );
  }

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  // const logOut = () => {
  //   dispatch(logout());
  // };

  return (
      <Router history={history}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot" component={ResetPassword} />
            </Switch>
      </Router>
  );
};

export default App;
