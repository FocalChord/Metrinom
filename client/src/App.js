import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import RedirectPage from "./components/RedirectPage";
import HomePage from "./components/HomePage";
import PrivateRoute from "./utils/routes/PrivateRoute";
import Header from "./components/Header";

const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/login/redirect/:token" component={RedirectPage} />
                <PrivateRoute exact path="/" component={HomePage} />
            </Switch>
        </div>
    );
};

export default withRouter(App);
