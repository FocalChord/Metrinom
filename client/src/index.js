import "./styles/main.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Logger } from "./utils";
import { AppConfiguration } from "./components";

// Configuration options
const opt = {
    LOG_LEVEL: process.env.REACT_ENV_LOG_LEVEL || "DEBUG",
};

Logger.setLogLevel(opt.LOG_LEVEL);

ReactDOM.render(
    <React.StrictMode>
        <AppConfiguration>
            <App />
        </AppConfiguration>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
