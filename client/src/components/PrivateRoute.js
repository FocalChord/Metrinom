import React from "react";
import { Route } from "react-router-dom";
import Border from "./Border";
import { LoginPage } from "../pages";
import { CookieManager } from "../utils";

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

export default PrivateRoute;
