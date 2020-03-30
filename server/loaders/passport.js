const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/user");
require("dotenv").config();

const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3001/auth/spotify/callback",
};

const setUpPassport = (app) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => done(null, user));
    });

    passport.use(
        new SpotifyStrategy(spotifyConfig, async (accessToken, refreshToken, expiresIn, profile, done) => {
            let user;

            try {
                user = await User.findOneAndUpdate(
                    {
                        spotifyUserId: profile.id,
                        displayName: profile.displayName,
                    },
                    {
                        accessToken,
                        refreshToken,
                    },
                );
            } catch (err) {
                return done(err, null);
            }

            if (!user) {
                try {
                    user = await User.create({
                        spotifyUserId: profile.id,
                        displayName: profile.displayName,
                        accessToken,
                        refreshToken,
                    });
                } catch (err) {
                    return done(err, null);
                }
            }

            return done(null, user);
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = setUpPassport;
