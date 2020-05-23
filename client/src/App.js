import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ArtistPage, HomePage, RecentlyPlayedPage, RedirectPage, TopArtistsPage, TopGenresPage, TopTracksPage, TrackPage } from "./pages";
import { PrivateRoute } from "./components";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/login/redirect/:token" component={RedirectPage} />
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/genres" component={TopGenresPage} />
                <PrivateRoute exact path="/artists" component={TopArtistsPage} />
                <PrivateRoute exact path="/tracks" component={TopTracksPage} />
                <PrivateRoute exact path="/recent" component={RecentlyPlayedPage} />
                <PrivateRoute exact path="/profile/:user" component={<div />} />
                <PrivateRoute path="/artist/:artistId" component={ArtistPage} />
                <PrivateRoute path="/track/:trackId" component={TrackPage} />
            </Switch>
        </div>
    );
};

export default withRouter(App);
