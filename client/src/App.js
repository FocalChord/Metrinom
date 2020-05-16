import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ArtistPage from "./components/ArtistPage";
import TrackPage from "./components/TrackPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import RedirectPage from "./components/RedirectPage";
import { ArtistStats, GenreStats, TrackStats } from "./components/stats";
import RecentlyPlayedStats from "./components/stats/RecentPlayedStats";
import PrivateRoute from "./utils/routes/PrivateRoute";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/login/redirect/:token" component={RedirectPage} />
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/genres" component={GenreStats} />
                <PrivateRoute exact path="/artists" component={ArtistStats} />
                <PrivateRoute exact path="/tracks" component={TrackStats} />
                <PrivateRoute exact path="/recent" component={RecentlyPlayedStats} />
                <PrivateRoute exact path="/profile/:user" component={ProfilePage} />
                <PrivateRoute path="/artist/:artistId" component={ArtistPage} />
                <PrivateRoute path="/track/:trackId" component={TrackPage} />
            </Switch>
        </div>
    );
};

export default withRouter(App);
