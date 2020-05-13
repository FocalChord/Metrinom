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

const getRecentTracks = () => {
    return ApiClient(`${spotifyEndpoint}/recent-played`);
};
const getArtist = (artistId) => {
    return ApiClient(`${spotifyEndpoint}/artist?artistId=${encodeURIComponent(artistId)}`);
};
const getRelatedArtist = (artistId) => {
    return ApiClient(`${spotifyEndpoint}/relatedArtist?artistId=${artistId}`);
};

const SpotifyClient = {
    getTopArtists,
    getTopTracks,
    getTopGenres,
    getRecentTracks,
    getArtist,
    getRelatedArtist,
};

export default SpotifyClient;
