const fetch = require("node-fetch");
const User = require("../models/user");
const LOGGER = require("../common/logger");

const ensureAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;
    const user = await User.findOne({ spotifyUserId: authorization });
    const authToken = user.accessToken;
    const timeFrame = "medium_term";

    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const spotifyTopUrl = "https://api.spotify.com/v1/me/top";

    const response = await fetch(spotifyTopUrl + `/artists?time_range=${timeFrame}&limit=50`, { method: "GET", headers });
    const statusCode = await response.status;

    if (statusCode === 401) {
        res.status(401).json({
            error: new Error("Unauthenticated"),
        });
        return;
    }

    next();
};

module.exports = ensureAuthenticated;
