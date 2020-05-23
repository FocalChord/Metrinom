const router = require("express").Router();
const passport = require("passport");
const spotifyAuthScope = require("../configs/spotify-auth-scopes");
require("dotenv").config();

const redirectURL = process.env.CLIENT_URL || "http://localhost:3000";

router.get(
    "/spotify",
    passport.authenticate("spotify", {
        scope: spotifyAuthScope,
    }),
);

router.get("/spotify/callback", passport.authenticate("spotify", { failureRedirect: "/", showDialog: true }), (req, res) => {
    const { spotifyUserId } = req.user;
    res.redirect(`${redirectURL}/login/redirect/${spotifyUserId}`);
});

module.exports = router;
