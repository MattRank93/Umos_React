import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#E83737"
        },
        secondary: {
            main: "#801c0d"
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
