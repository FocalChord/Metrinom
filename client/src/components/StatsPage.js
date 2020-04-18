import React from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../utils/routes/PrivateRoute";
import { StatsHeader, GenreStats, ArtistStats, TrackStats } from "./stats";

const StatsPage = () => {
    return (
        <div>
            <StatsHeader />
            <Switch>
                <PrivateRoute exact path="/stats/genres" component={GenreStats} />
                <PrivateRoute exact path="/stats/artists" component={ArtistStats} />
                <PrivateRoute exact path="/stats/tracks" component={TrackStats} />
                <Redirect from="/stats" to="/stats/genres" />
            </Switch>
        </div>
    );
};

export default StatsPage;