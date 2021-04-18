import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.css";

import LoginTCA from "./views/tc/LoginTCA";
import LoginPDA from "./views/pd/LoginPDA";
import {clearMessage} from "./actions/message";
import {history} from "./helpers/history";
import PrivateRoute from "./PrivateRoute";
import Enter from "./views/Enter";
import ResetPasswordTCA from "./views/tc/ResetPasswordTCA";
import RegisterTCA from "./views/tc/RegisterTCA";
import HomeTCA from "./views/tc/HomeTCA";
import HomePDA from "./views/pd/HomePDA";


const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
      <Router>
            <Switch>
              <Route exact path={"/"} component={Enter}/>
              <Route exact path= {"/tc"} component={LoginTCA}/>
              <Route exact path= {"/tc/forgot"} component={ResetPasswordTCA}/>
              <Route exact path= {"/tc/register"} component={RegisterTCA}/>
              <PrivateRoute exact path= {"/tc/home"} loggedIn={currentUser} component={HomeTCA}/>
              <Route exact path= {"/pd"} component={LoginPDA}/>
              {/*<Route exact path= {"/pd/forgot"} component={ResetPasswordTCA}/>*/}
              {/*<Route exact path= {"/pd/register"} component={RegisterTCA}/>*/}
              <PrivateRoute path= {"/pd/home"} loggedIn={currentUser} component={HomePDA}/>
            </Switch>
      </Router>
  );
};

export default App;
