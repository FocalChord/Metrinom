import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../utils/routes/PrivateRoute";
import { StatsHeader, GenreStats, ArtistStats, TrackStats } from "./stats";

const StatsPage = () => {
    return (
        <div>
            <StatsHeader />
            <PrivateRoute exact path="/stats/genres" component={GenreStats} />
            <PrivateRoute exact path="/stats/artists" component={ArtistStats} />
            <PrivateRoute exact path="/stats/tracks" component={TrackStats} />
        </div>
    );
};

export default StatsPage;
