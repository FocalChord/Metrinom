import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CookieManager from "./utils/CookieManager";
import Header from "./components/Header";
import RedirectPage from "./components/RedirectPage";
import PrivateRoute from "./utils/routes/PrivateRoute";
import HomePage from "./components/HomePage";
import StatsPage from "./components/StatsPage";
import ProfilePage from "./components/ProfilePage";

const App = () => {
    return (
        <div>
            <Header user={CookieManager.getUserToken()} />
            <Switch>
                <Route exact path="/login/redirect/:token" component={RedirectPage} />
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/stats" component={StatsPage} />
                <PrivateRoute exact path="/profile/:user" component={ProfilePage} />
            </Switch>
        </div>
    );
};

export default withRouter(App);
