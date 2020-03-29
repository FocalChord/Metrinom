const router = require("express").Router();
const passport = require("passport");
const spotifyAuthScope = require("../configs/spotify-auth-scopes");

router.get("/login", (req, res) => {
    res.send("Hello Worldsss");
});

router.get(
    "/spotify",
    passport.authenticate("spotify", {
        scope: spotifyAuthScope,
    }),
);

router.get("/spotify/callback", passport.authenticate("spotify", { failureRedirect: "/login" }), (req, res) => {
    res.send(req.user);
});

module.exports = router;
