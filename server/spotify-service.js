const fetch = require("node-fetch");
const spotify = require("./spotify-logic");
const LOGGER = require("./common/logger");

const spotifyTopUrl = "https://api.spotify.com/v1/me/top";
const spotifyRecommendationUrl = "https://api.spotify.com/v1/recommendations";
const spotifyUserUrl = "https://api.spotify.com/v1/users";
const spotifyPlaylistUrl = "https://api.spotify.com/v1/playlists";
const spotifyRecentTracksUrl = " https://api.spotify.com/v1/me/player/recently-played?limit=50";

const fetchTopArtistOrTracks = async (type, timeFrame, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyTopUrl + `/${type}?time_range=${timeFrame}&limit=50`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchRecomendations = async (seedArtist, seedTracks, seedGenres, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(
            spotifyRecommendationUrl +
                `/?limit=20&seed_artist=${seedArtist}&seed_tracks=${seedTracks}&seed_genres=${seedGenres}&min_energy=0.4&min_popularity=50`,
            { method: "GET", headers },
        );
        const json = await response.json();

        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchTopGenres = async (timeFrame, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyTopUrl + `/artists?time_range=${timeFrame}&limit=50`, { method: "GET", headers });
        const json = await response.json();
        const topGenreJson = spotify.findGenres(json);

        return topGenreJson;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchMakePlaylist = async (songURIList, spotifyUserId, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        // creates a playlist for the specified user
        const createdplaylistResponse = await fetch(spotifyUserUrl + `/${spotifyUserId}/playlists`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                name: "New Playlist from Metronom",
                description: "New playlist created by Metronom",
                public: false,
            }),
        });
        const playlistResponseJson = await createdplaylistResponse.json();
        console.log(spotifyUserId);
        const playlistId = playlistResponseJson.id;

        const addTrackBody = {
            uris: songURIList,
        };
        // adds the songs to the playlist
        const addedTrackResponse = await fetch(spotifyPlaylistUrl + `/${playlistId}/tracks`, {
            method: "POST",
            headers,
            body: JSON.stringify(addTrackBody),
        });
        const addedTrackResponseJson = await addedTrackResponse.json();
        return addedTrackResponseJson;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchRecentTracks = async (authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyRecentTracksUrl, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

module.exports = { fetchTopArtistOrTracks, fetchRecomendations, fetchTopGenres, fetchMakePlaylist, fetchRecentTracks };
