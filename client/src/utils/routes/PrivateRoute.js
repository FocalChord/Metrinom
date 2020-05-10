import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";
import Border from "../../components/border/Border";
import LoginPage from "../../components/LoginPage";
import CookieManager from "../CookieManager";

const PrivateRoute = ({ component: Component, ...options }) => {
    const token = CookieManager.getUserToken();

    return (
        <Route
            {...options}
            render={(props) =>
                token ? (
                    <Border>
                        <Component {...props} />
                    </Border>
                ) : (
                    <LoginPage />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
};

export default PrivateRoute;
