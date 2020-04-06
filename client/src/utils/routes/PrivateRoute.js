import React from "react";
import PropTypes from "prop-types";
import LoginPage from "../../components/LoginPage/LoginPage";
import CookieManager from "../CookieManager";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component, ...options }) => {
    const token = CookieManager.getUserToken();
    const finalComponent = token ? component : LoginPage;
    return <Route {...options} component={finalComponent} />;
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
};

export default PrivateRoute;
