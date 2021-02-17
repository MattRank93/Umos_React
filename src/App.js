import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.css";

import PdUserLogin from "./components/PdUserLogin";
import PdAdminLogin from "./components/PdAdminLogin";
import Register from "./components/Register";
import PdRegister from "./components/PdRegister";
import Profile from "./components/Profile";
import Home from "./components/Home"
import ResetPassword from "./components/ResetPassword";
import {clearMessage} from "./actions/message";
import {history} from "./helpers/history";
import PrivateRoute from "./PrivateRoute";
import GoogleMapSDK from "./components/MapsSDK";

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
              <Route exact path={"/pduserlogin"} component={PdUserLogin}/>
              <Route exact path= {"/pdadminlogin"} component={PdAdminLogin} />
              <Route exact path= {"/register"} component={Register} />
              <Route exact path= {"/pdadminregister"} component={PdRegister} />
              <Route exact path= {"/pdadminportal"} component={PdRegister} />
              <Route exact path= {"/forgot"} component={ResetPassword} />
              <Route exact path= {"/home"} component={Home} />
              <PrivateRoute path= {"/maps"} loggedIn={currentUser} component={GoogleMapSDK}  />
              <PrivateRoute path= {"/profile"} loggedIn={currentUser} component={Profile}  />
            </Switch>
      </Router>
  );
};

export default App;