const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../src/models/user");
require("dotenv").config();

const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/spotify/callback",
};

module.exports = (app) => {
    passport.serializeUser((user, done) => {
        User.findById(user.id).then((t) => console.log(t));
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => done(null, user));
    });

    passport.use(
        new SpotifyStrategy(spotifyConfig, (accessToken, refreshToken, expiresIn, profile, done) => {
            const { id, displayName } = profile;
            const userLoggingIn = {
                spotifyUserId: id,
                displayName,
            };

            User.findOrCreate(userLoggingIn, (err, user) => done(err, user));
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
};
