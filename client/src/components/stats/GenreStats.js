import React, { useState, useEffect } from "react";
import SpotifyClient from "../../utils/SpotifyClient";

const GenreStats = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopGenres().then((r) => setGenres(r.genres));
        console.log("GENRES: " + genres);
    }, []);

    return (
        <div className="text-center">
            <h1>Your top genres are</h1>
            <ul>
                {genres.map((x, idx) => (
                    <li key={idx}>
                        {" "}
                        {x[0]} {x[1]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenreStats;
