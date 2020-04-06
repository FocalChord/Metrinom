import ApiClient from "./ApiClient";

const spotifyEndpoint = "spotify";

const getTopArtists = (type = "artists", timeFrame = "medium_term") => {
    return ApiClient(`${spotifyEndpoint}/top?type=${encodeURIComponent(type)}&timeFrame=${encodeURIComponent(timeFrame)}`);
};

const getTopTracks = (type = "tracks", timeFrame = "medium_term") => {
    return ApiClient(`${spotifyEndpoint}/top?type=${encodeURIComponent(type)}&timeFrame=${encodeURIComponent(timeFrame)}`);
};

const getTopGenres = () => {
    return ApiClient(`${spotifyEndpoint}/top/genres`);
};

const SpotifyClient = {
    getTopArtists,
    getTopTracks,
    getTopGenres,
};

export default SpotifyClient;
