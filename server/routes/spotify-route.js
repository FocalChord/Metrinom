const express = require("express");
const router = express.Router();
const User = require("../models/user");
const LOGGER = require("../common/logger");
const spotify = require("../spotify-service");

/**
 * @swagger
 *  components:
 *    schemas:
 *      Genres:
 *        type: object
 *        required:
 *        properties:
 *          genres:
 *             type: Array
 *        example:
 *           genres: [[pop,21],[rap,12]]
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      TrackURI:
 *        type: object
 *        required:
 *        properties:
 *          uris:
 *             type: Array
 *        example:
 *           uris: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"]
 */

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
 *          description: Optional. Valid values= long_term (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default= medium_term
 *      responses:
 *        "200":
 *          description: An array items that contains artists or tracks ref= https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
router.get("/top/", (req, res) => {
    const { authorization } = req.headers;
    const timeFrame = req.query.timeFrame || "medium_term";
    const { type } = req.query;

    // Retrieve the user in the database
    User.findOne({ spotifyUserId: authorization }, async (err, user) => {
        if (err || user == null) {
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            const authToken = user.accessToken;
            const data = await spotify.fetchTopArtistOrTracks(type, timeFrame, authToken);
            if (data.error) {
                LOGGER.error(data);
                res.status(400).json(data);
            } else {
                res.status(200).json(data);
            }
        }
    });
});
/**
 * @swagger
 * path:
 *  /spotify/top/{id}/genres:
 *    get:
 *      tags: [Spotify]
 *      summary: Gets top genres for the particular user
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: spotify id of user
 *      responses:
 *        "200":
 *          description: An array of genres in rankings from highest to lowest
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Genres'
 */
router.get("/top/genres", (req, res) => {
    const { authorization } = req.headers;

    const timeFrame = "medium_term";

    // Retrieve the user in the database
    User.findOne({ spotifyUserId: authorization }, async (err, user) => {
        if (err || user == null) {
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            const authToken = user.accessToken;
            const data = await spotify.fetchTopGenres(timeFrame, authToken);
            if (data.error) {
                LOGGER.error(data);
                res.status(400).json(data);
            } else {
                res.status(200).json(data);
            }
        }
    });
});

/**
 * @swagger
 * path:
 *  /spotify/recommendations/{id}:
 *    get:
 *      tags: [Spotify]
 *      summary: Get recommended tracks based on seeds
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: spotify id of user
 *        - in: query
 *          name: seed_artist
 *          schema:
 *            type: string
 *          required: false
 *          description: A comma separated list of Spotify IDs for seed artists. Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
 *        - in: query
 *          name: seed_tracks
 *          schema:
 *            type: string
 *          required: false
 *          description: A comma separated list of Spotify IDs for seed artists. Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
 *        - in: query
 *          name: seed_genres
 *          schema:
 *            type: string
 *          required: false
 *          description: A comma separated list of Spotify IDs for seed artists. Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.
 *      responses:
 *        "200":
 *          description: An array items that contains artists or tracks ref= https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
router.get("/recommendations/", (req, res) => {
    const seedArtist = req.query.seed_artist || "";
    const seedTracks = req.query.seed_tracks || "";
    const seedGenres = req.query.seed_genres || "";

    const { authorization } = req.headers;

    // Retrieve the user in the database
    User.findOne({ spotifyUserId: authorization }, async (err, user) => {
        if (err || user == null) {
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            const authToken = user.accessToken;
            const data = await spotify.fetchRecomendations(seedArtist, seedTracks, seedGenres, authToken);
            if (data.error) {
                LOGGER.error(data);
                res.status(400).json(data);
            } else {
                res.status(200).json(data);
            }
        }
    });
});
/**
 * @swagger
 * path:
 *  /spotify/playlist/create/{id}:
 *    post:
 *      tags: [Spotify]
 *      summary: Get recommended tracks based on seeds
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: spotify id of user
 *      requestBody:
 *        required: true
 *        description: A JSON array of the Spotify track URIs to add.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TrackURI'
 *      responses:
 *        "200":
 *          description: A snapshot that shows the added tracks to playlist  ref= https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */
router.post("/playlist/create/", (req, res) => {
    const { authorization } = req.headers;

    const songURIList = req.body.uris || "";
    // Retrieve the user in the database
    User.findOne({ spotifyUserId: authorization }, async (err, user) => {
        if (err || user == null) {
            LOGGER.error(err);
            res.status(400).json({ msg: "error" });
        } else {
            const authToken = user.accessToken;
            const data = await spotify.fetchMakePlaylist(songURIList, req.params.id, authToken);
            if (data.error) {
                LOGGER.error(data);
                res.status(400).json(data);
            } else {
                res.status(200).json(data);
            }
        }
    });
});

module.exports = router;
