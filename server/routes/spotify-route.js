const express = require("express");
const router = express.Router();
const User = require("../models/user");
const LOGGER = require("../log/logger");
const fetch = require("node-fetch");

const spotifyTopUrl = "https://api.spotify.com/v1/me/top";

/**
 * @swagger
 * path:
 *  /spotify/top/{id}:
 *    get:
 *      tags: [Spotify]
 *      summary: Get top tracks or artists for the particular user
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: spotify id of user
 *        - in: query
 *          name: type
 *          schema:
 *            type: string
 *          required: true
 *          description: Type of entity to return. Valid values = 'artists' or 'tracks'
 *        - in: query
 *          name: timeFrame
 *          schema:
 *            type: string
 *          required: false
 *          description: Optional. Over what time frame the affinities are computed. Valid values= long_term (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default= medium_term
 *      responses:
 *        "200":
 *          description: An array items that contains artists or tracks ref= https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
router.get("/top/:id", (req, res) => {
    const timeFrame = req.query.timeFrame || "medium_term";
    const type = req.query.type;

    // Retrieve the user in the database
    User.findOne({ spotifyUserId: req.params.id }, (err, user) => {
        if (err || user == null) {
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            const authToken = user.accessToken;
            const headers = {
                Authorization: "Bearer " + authToken,
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            fetch(spotifyTopUrl + `/${type}?time_range=${timeFrame}&limit=50`, { method: "GET", headers: headers })
                .then((response) => response.json())
                .then((data) => {
                    res.status(200).json(data);
                });
        }
    });
});

module.exports = router;
