import React, { useState, useEffect } from "react";
import SpotifyClient from "../../utils/SpotifyClient";

const ArtistStats = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopArtists().then((r) => setArtists(r.genres));
    }, []);

    return (
        <div className="text-center">
            <h1>Your top Artists are</h1>
            <ul>
                {artists ? (
                    artists.map((x, idx) => (
                        <li key={idx}>
                            {" "}
                            {x[0]} {x[1]}
                        </li>
                    ))
                ) : (
                    <li>No Artist data available :(</li>
                )}
            </ul>
        </div>
    );
};

export default ArtistStats;
