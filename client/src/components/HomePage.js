import React, { useState, useEffect } from "react";
import SpotifyClient from "../utils/SpotifyClient";

const HomePage = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopGenres().then((r) => setGenres(r.genres));
        console.log("HOME: " + genres);
    }, []);

    return (
        <div className="text-center">
            <header className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-6xl">
                <ul>
                    <li> Home Page</li>
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
