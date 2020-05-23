import "./styles/main.css";

import * as serviceWorker from "./serviceWorker";

import { ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import App from "./App";
import { CssBaseline } from "@material-ui/core";
import { LastLocationProvider } from "react-router-last-location";
import { MetrinomProvider } from "./context/MetrinomContext";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Logger } from "./utils";

const darkTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: "dark",
        },
    }),
);

// Configuration options
const opt = {
    LOG_LEVEL: process.env.REACT_ENV_LOG_LEVEL || "DEBUG",
};

Logger.setLogLevel(opt.LOG_LEVEL);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MetrinomProvider>
                <Router>
                    <LastLocationProvider>
                        <App />
                    </LastLocationProvider>
                </Router>
            </MetrinomProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
