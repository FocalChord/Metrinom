const router = require("express").Router();
const passport = require("passport");
const spotifyAuthScope = require("../../passport/spotify-auth-scopes");

router.get("/login", (req, res) => {
    res.send("Hello Worldsss");
});

router.get(
    "/spotify",
    passport.authenticate("spotify", {
        scope: spotifyAuthScope,
    }),
    (req, res) => {
        console.log("/spotify called");
    },
);

router.get("/spotify/callback", passport.authenticate("spotify", { failureRedirect: "/login" }), (req, res) => {
    console.log("Redirecting");
    res.send(req.user);
});

module.exports = router;
