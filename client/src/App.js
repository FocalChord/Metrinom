import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import RedirectPage from "./components/RedirectPage/RedirectPage";
import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./utils/routes/PrivateRoute";

const App = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login/redirect/:token" component={RedirectPage} />
        </Switch>
    );
};

export default withRouter(App);
