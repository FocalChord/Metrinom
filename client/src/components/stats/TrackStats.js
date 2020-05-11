import React, { useContext, useEffect, useState } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import LoaderWrapper from "../LoaderWrapper";

const TrackStats = () => {
    const [tracks, setTracks] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        SpotifyClient.getTopTracks().then((r) => {
            setTracks(r.genres);
            setIsLoading(false);
        });
    }, []);

    return (
        <LoaderWrapper>
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
                        <li>No Track data available :(</li>
                    )}
                </ul>
            </div>
        </LoaderWrapper>
    );
};

export default TrackStats;
