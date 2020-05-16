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
    return ApiClient(`${spotifyEndpoint}/relatedArtist?artistId=${encodeURIComponent(artistId)}`);
};

const followArtist = (artistId) => {
    return ApiClient(`${spotifyEndpoint}/artist/follow?artistId=${encodeURIComponent(artistId)}`, {
        method: "PUT",
    });
};

const unfollowArtist = (artistId) => {
    return ApiClient(`${spotifyEndpoint}/artist/unfollow?artistId=${encodeURIComponent(artistId)}`, {
        method: "DELETE",
    });
};

const checkFollowing = (artistId) => {
    return ApiClient(`${spotifyEndpoint}/isFollowing?artistId=${encodeURIComponent(artistId)}`);
};

const makePlaylist = (songUriList) => {
    return ApiClient(`${spotifyEndpoint}/playlist/create`, {
        method: "POST",
        body: {
            uris: songUriList,
        },
    });
};

const makePlaylistFromGenres = (genres, metrics) => {
    console.log(genres);
    console.log("d: " + metrics.danceability);
    console.log("e: " + metrics.energy);
    console.log("l: " + metrics.liveness);
    console.log("p: " + metrics.popularity);
    console.log("v: " + metrics.valence);
};

const getTrack = (trackId) => {
    return ApiClient(`${spotifyEndpoint}/track?trackId=${encodeURIComponent(trackId)}`);
};

const getAudioFeatures = (trackId) => {
    return ApiClient(`${spotifyEndpoint}/audio-features?trackId=${encodeURIComponent(trackId)}`);
};

const SpotifyClient = {
    getTopArtists,
    getTopTracks,
    getTopGenres,
    getRecentTracks,
    getArtist,
    getRelatedArtist,
    getTrack,
    getAudioFeatures,
    followArtist,
    unfollowArtist,
    checkFollowing,
    makePlaylist,
    makePlaylistFromGenres,
};

export default SpotifyClient;
