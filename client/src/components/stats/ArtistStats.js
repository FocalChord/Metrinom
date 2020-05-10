import React, { useContext, useEffect, useState } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import LoaderWrapper from "../LoaderWrapper";

const ArtistStats = () => {
    const [artists, setArtists] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        SpotifyClient.getTopArtists().then((r) => {
            setArtists(r.genres);
            setIsLoading(false);
        });
    }, []);

    return (
        <LoaderWrapper>
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
        </LoaderWrapper>
    );
};

export default ArtistStats;
