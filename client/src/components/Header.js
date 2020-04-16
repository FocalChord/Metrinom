import React from "react";
import CookieManager from "../utils/CookieManager";

const Header = () => {
    const token = CookieManager.getUserToken();

    return token ? (
        <div>
            <h1>HEADER GOES HERE</h1>
        </div>
    ) : null;
};

export default Header;
