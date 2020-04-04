const fetch = require("node-fetch");
const spotify = require("./spotify-logic");

const fetchTopArtistOrTracks = async (url, type, timeFrame, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const response = await fetch(url + `/${type}?time_range=${timeFrame}&limit=50`, { method: "GET", headers: headers });
    const json = await response.json();
    return json;
};

const fetchRecomendations = async (url, seedArtist, seedTracks, seedGenres, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const response = await fetch(
        url + `/?limit=20&seed_artist=${seedArtist}&seed_tracks=${seedTracks}&seed_genres=${seedGenres}&min_energy=0.4&min_popularity=50`,
        { method: "GET", headers: headers },
    );
    const json = await response.json();

    return json;
};

const fetchTopGenres = async (url, timeFrame, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const response = await fetch(url + `/artists?time_range=${timeFrame}&limit=50`, { method: "GET", headers: headers });
    const json = await response.json();
    const topGenreJson = spotify.findGenres(json);

    return topGenreJson;
};

module.exports = { fetchTopArtistOrTracks, fetchRecomendations, fetchTopGenres };
