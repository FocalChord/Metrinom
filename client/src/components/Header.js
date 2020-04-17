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
        <nav className="lg:px-16 px-6 lg:h-12 bg-black text-white text-6x1 cursor-text- flex justify-around items-center lg:py-0 py-2">
            <Link
                to="/"
                onClick={() => setSelected("")}
                className={
                    "list-none border-b-2 border-transparent hover:border-green-500 hover:border-green-500" +
                    (selected === "" ? " text-green-500" : "")
                }
            >
                <li>LOGO HERE</li>
            </Link>
            <ul className="flex justify-around items-center w-1/2">
                <Link
                    to="/stats"
                    // Prevent clicking on the 'Stats' link when already on a stats subpage (genres, artists or tracks)
                    onClick={(e) => (selected !== "stats" ? setSelected("stats") : e.preventDefault())}
                    className={
                        "border-b-2 border-transparent c hover:border-green-500" +
                        (selected === "stats" ? " text-green-500 cursor-default" : "")
                    }
                >
                    <li>Stats</li>
                </Link>
                <Link
                    to={`/profile/${props.user}`}
                    onClick={() => setSelected("profile")}
                    className={"border-b-2 border-transparent hover:border-green-500" + (selected === "profile" ? " text-green-500" : "")}
                >
                    <li>{props.user}</li>
                </Link>
            </ul>
            <Link to="/">
                <button onClick={logoutHandler} className="border-b-2 border-transparent hover:border-red-600">
                    Logout
                </button>
            </Link>
        </nav>
    ) : null;
};

export default Header;
