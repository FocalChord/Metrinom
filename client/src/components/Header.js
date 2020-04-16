import React, { useState } from "react";
import CookieManager from "../utils/CookieManager";
import { Link } from "react-router-dom";

const Header = (props) => {
    const token = CookieManager.getUserToken();

    const [selected, setSelected] = useState(window.location.pathname.split("/")[1]);

    const logoutHandler = () => {
        CookieManager.removeUserToken();
    };

    return token ? (
        <nav class="lg:px-16 px-6 lg:h-12 bg-black text-white text-6x1 cursor-text- flex justify-around items-center lg:py-0 py-2">
            <Link to="/" class="list-none border-b-2 border-transparent hover:border-green-600 hover:border-green-600">
                <li>LOGO HERE</li>
            </Link>
            <ul class="flex justify-around items-center w-1/2">
                <Link
                    to="/stats"
                    onClick={() => setSelected("stats")}
                    class={"border-b-2 border-transparent c hover:border-green-600" + (selected === "stats" ? " text-green-600" : "")}
                >
                    <li>Stats</li>
                </Link>
                <Link
                    to={`/profile/${props.user}`}
                    onClick={() => setSelected("profile")}
                    class={"border-b-2 border-transparent hover:border-green-600" + (selected === "profile" ? " text-green-600" : "")}
                >
                    <li>{props.user}</li>
                </Link>
            </ul>
            <Link to="/">
                <button onClick={logoutHandler} class="border-b-2 border-transparent hover:border-green-600">
                    Logout
                </button>
            </Link>
        </nav>
    ) : null;
};

export default Header;
