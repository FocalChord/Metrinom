import React, { useState, useEffect } from "react";
import SpotifyClient from "../../utils/SpotifyClient";
import List from "@material-ui/core/List";
import TableRow from "./TableRow";

const GenreStats = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopGenres().then((r) => setGenres(r.genres));
    }, []);

    return (
        <div className="text-center">
            <h1>Your top Genres are</h1>
            <List>
                {genres ? genres.map((x, i) => <TableRow key={i} id={i} name={x[0]} number={x[1]} />) : <li>No Genre data available</li>}
            </List>
        </div>
    );
};

export default GenreStats;
