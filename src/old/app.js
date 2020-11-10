// import React, {useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//
// import "./App.css";
//
// import Login from "./components/Login";
// import Home from "./components/Home";
// import Profile from "./components/Dashboard";
// //import BoardUser from "./components/BoardUser";
//
// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";
//
// import { history } from "./helpers/history";
//
// const App = () => {
//     const { user: currentUser } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     document.title = 'stuff';
//
//     useEffect(() => {
//         history.listen((location) => {
//             dispatch(clearMessage()); // clear message when changing location
//         });
//     }, [dispatch]);
//
//     return (
//         <Router history={history}>
//             <Switch>
//                 <Route exact path={["/", "/login"]} component={Login} />
//                 <Route exact path="/profile" component={Profile} />
//             </Switch>
//         </Router>
//     );
// };
//
// export default App;