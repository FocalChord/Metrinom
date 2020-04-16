import React, { useState, useEffect } from "react";
import SpotifyClient from "../utils/SpotifyClient";
import CookieManager from "../utils/CookieManager";
import { useHistory } from "react-router";

const HomePage = () => {
    const history = useHistory();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopGenres().then((r) => setGenres(r.genres));
    }, []);

    const logoutHandler = () => {
        CookieManager.removeUserToken();
        history.push("/");
    };

    return (
        <div className="text-center">
            <header className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-6xl">
                <ul>
                    <li> Home Page</li>
                    <li>
                        <button onClick={logoutHandler}> Logout </button>
                    </li>
                    Your top genres are
                    {genres.map((x, idx) => (
                        <li key={idx}>
                            {" "}
                            {x[0]} {x[1]}
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
};

export default HomePage;
