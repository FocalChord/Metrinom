const fetch = require("node-fetch");
const spotify = require("./spotify-logic");
const LOGGER = require("./common/logger");

const spotifyTopUrl = "https://api.spotify.com/v1/me/top";
const spotifyRecommendationUrl = "https://api.spotify.com/v1/recommendations";
const spotifyUserUrl = "https://api.spotify.com/v1/users";
const spotifyPlaylistUrl = "https://api.spotify.com/v1/playlists";
const spotifyRecentTracksUrl = " https://api.spotify.com/v1/me/player/recently-played?limit=50";
const spotifyArtistUrl = "https://api.spotify.com/v1/artists";
const spotifyFollowUrl = "https://api.spotify.com/v1/me/following";
const spotifyTrackUrl = "https://api.spotify.com/v1/tracks";
const spotifyAudioFeaturesUrl = "https://api.spotify.com/v1/audio-features";

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

const fetchRecomendations = async (seedArtists, seedTracks, seedGenres, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(
            spotifyRecommendationUrl +
                `/?limit=20&seed_artists=${seedArtists}&seed_tracks=${seedTracks}&seed_genres=${seedGenres}&min_energy=0.4&min_popularity=50`,
            { method: "GET", headers },
        );
        const json = await response.json();

        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchTrackRecommendationsFromGenresAndMetrics = async (seedGenres, d, e, l, p, v, authToken) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(
            spotifyRecommendationUrl +
                `?limit=20&seed_genres=${seedGenres}&target_danceability=${d}&target_energy=${e}&target_liveness=${l}&target_popularity=${p}&target_valence=${v}`,
            { method: "GET", headers },
        );
        const json = await response.json();

        return json.tracks.map((t) => t.uri);
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
                name: `Playlist by Metrinom - ${new Date().toLocaleString("default")}`,
                description: "New playlist created by Metrinom",
                public: false,
            }),
        });
        const playlistResponseJson = await createdplaylistResponse.json();
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

const fetchArtist = async (authToken, artistID) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyArtistUrl + `/${artistID}`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchRelatedArtist = async (authToken, artistID) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyArtistUrl + `/${artistID}/related-artists`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const followArtist = async (authToken, artistID) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        await fetch(spotifyFollowUrl + `?type=artist&ids=${artistID}`, { method: "PUT", headers });
        return;
    } catch (error) {
        LOGGER.error(error);
        return error;
    }
};

const unFollowArtist = async (authToken, artistID) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        await fetch(spotifyFollowUrl + `?type=artist&ids=${artistID}`, { method: "DELETE", headers });
        return;
    } catch (error) {
        LOGGER.error(error);
        return error;
    }
};

const checkFollowing = async (authToken, artistID) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyFollowUrl + `/contains?type=artist&ids=${artistID}`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchTrack = async (authToken, trackId) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyTrackUrl + `/${trackId}`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchAudioFeatures = async (authToken, trackId) => {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(spotifyAudioFeaturesUrl + `/${trackId}`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchGraph = async (authToken) => {
    const response = await fetchTopArtistOrTracks("artists", "medium_term", authToken);

    const topArtists = response.items.map((artist) => {
        let artistImage = "";
        if (artist && artist.images && artist.images[0] && artist.images[0].url) {
            artistImage = artist.images[0].url;
        }

        return {
            id: artist.id,
            name: artist.name,
            genres: artist.genres,
            profilePicture: artistImage,
        };
    });

    const artistGraph = {
        nodes: [],
        edges: [],
    };

    const genreMap = {};

    topArtists.forEach((artist) => {
        artistGraph.nodes.push({ id: artist.id, label: artist.name, image: artist.profilePicture });

        artist.genres.forEach((genre) => {
            if (!genreMap[genre]) genreMap[genre] = [artist.id];
            else {
                genreMap[genre].forEach((genreArtist) => {
                    artistGraph.edges.push({
                        from: genreArtist,
                        to: artist.id,
                    });
                });

                genreMap[genre].push(artist.id);
            }
        });
    });

    console.log(artistGraph);
    return artistGraph;
};

module.exports = {
    fetchTopArtistOrTracks,
    fetchAudioFeatures,
    fetchRecomendations,
    fetchTrackRecommendationsFromGenresAndMetrics,
    fetchTopGenres,
    fetchMakePlaylist,
    fetchRecentTracks,
    fetchArtist,
    fetchRelatedArtist,
    followArtist,
    unFollowArtist,
    checkFollowing,
    fetchTrack,
    fetchGraph,
};
