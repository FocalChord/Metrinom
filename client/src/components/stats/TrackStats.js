import React, { useState, useEffect } from "react";
import SpotifyClient from "../../utils/SpotifyClient";

const TrackStats = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopTracks().then((r) => setTracks(r.genres));
        console.log("GENRES: " + tracks);
    }, []);

    return (
        <div className="text-center">
            <h1>Your top Tracks are</h1>
            <ul>
                {tracks ? (
                    tracks.map((x, idx) => (
                        <li key={idx}>
                            {" "}
                            {x[0]} {x[1]}
                        </li>
                    ))
                ) : (
                    <li>No Track data available</li>
                )}
            </ul>
        </div>
    );
};

export default TrackStats;
