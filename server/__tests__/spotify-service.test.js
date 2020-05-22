jest.mock("node-fetch");
const fetch = require("node-fetch");
const spotify = require("../spotify-service");
const spotifyLogic = require("../spotify-logic");

const JSON_MOCK_VALUE = { baked: "beans", id: "gg321" }; // Mock data for json() method to return

const spotifyTopUrl = "https://api.spotify.com/v1/me/top";
const spotifyRecommendationUrl = "https://api.spotify.com/v1/recommendations";
const spotifyUserUrl = "https://api.spotify.com/v1/users";
const spotifyPlaylistUrl = "https://api.spotify.com/v1/playlists";
const spotifyRecentTracksUrl = " https://api.spotify.com/v1/me/player/recently-played?limit=50";
const spotifyArtistUrl = "https://api.spotify.com/v1/artists";
const spotifyFollowUrl = "https://api.spotify.com/v1/me/following";
const spotifyTrackUrl = "https://api.spotify.com/v1/tracks";
const spotifyAudioFeaturesUrl = "https://api.spotify.com/v1/audio-features";

beforeEach(() => {
    // Reset the mock to prevent tests affecting each other
    fetch.mockClear();

    // Mock the async json() call (for the data returned by fetch())
    const mockJsonPromise = Promise.resolve(JSON_MOCK_VALUE);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    fetch.mockImplementation(() => mockFetchPromise);
});

test("fetchTopArtistOrTracks() fetches from Spotify", async () => {
    // Set up dummy input data
    const type = "artists";
    const timeFrame = "longterm";
    const authToken = "abc123";

    const data = await spotify.fetchTopArtistOrTracks(type, timeFrame, authToken);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyTopUrl + `/${type}?time_range=${timeFrame}&limit=50`);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("fetchRecommendations() fetches from Spotify", async () => {
    // Set up dummy input data
    const seedArtists = "artists";
    const seedTracks = "tracks";
    const seedGenres = "tracks";
    const authToken = "edf456";

    const data = await spotify.fetchRecomendations(seedArtists, seedTracks, seedGenres, authToken);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(
        spotifyRecommendationUrl +
            `/?limit=20&seed_artists=${seedArtists}&seed_tracks=${seedTracks}&seed_genres=${seedGenres}&min_energy=0.4&min_popularity=50`,
    );
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("fetchTrackRecommendationsFromGenresAndMetrics() fetches from Spotify", async () => {
    // Mock the async json() call (special case for this test)
    const mockJsonPromise = Promise.resolve({ tracks: [{ uri: "uri" }] });
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    fetch.mockImplementation(() => mockFetchPromise);

    // Set up dummy input data
    const seedGenres = "tracks";
    const d = "danceability";
    const e = "energy";
    const l = "liveness";
    const p = "popularity";
    const v = "valence";
    const authToken = "edf456";

    const data = await spotify.fetchTrackRecommendationsFromGenresAndMetrics(seedGenres, d, e, l, p, v, authToken);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(
        spotifyRecommendationUrl +
            `?limit=20&seed_genres=${seedGenres}&target_danceability=${d}&target_energy=${e}&target_liveness=${l}&target_popularity=${p}&target_valence=${v}`,
    );
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toStrictEqual(["uri"]);
});

test("fetchTopGenres() fetches from Spotify", async () => {
    // Mock findGenres
    jest.spyOn(spotifyLogic, "findGenres").mockReturnValue(["hip hop"]);

    // Set up dummy input data
    const timeFrame = "shortterm";
    const authToken = "edf456";

    const data = await spotify.fetchTopGenres(timeFrame, authToken);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyTopUrl + `/artists?time_range=${timeFrame}&limit=50`);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toStrictEqual(["hip hop"]);
});

test("fetchMakePlaylist() fetches from Spotify", async () => {
    // Set up dummy input data
    const songURIList = "143,235,611";
    const spotifyUserId = "nisarag";
    const authToken = "xzy789";

    const data = await spotify.fetchMakePlaylist(songURIList, spotifyUserId, authToken);

    expect(fetch.mock.calls.length).toBe(2);

    // First call to fetch
    expect(fetch.mock.calls[0][0]).toBe(spotifyUserUrl + `/${spotifyUserId}/playlists`);
    expect(fetch.mock.calls[0][1].method).toBe("POST");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Second call to fetch
    expect(fetch.mock.calls[1][0]).toBe(spotifyPlaylistUrl + `/${JSON_MOCK_VALUE.id}/tracks`);
    expect(fetch.mock.calls[1][1].method).toBe("POST");
    expect(fetch.mock.calls[1][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[1][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[1][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("fetchRecentTracks() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";

    const data = await spotify.fetchRecentTracks(authToken);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyRecentTracksUrl);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("fetchArtist() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";
    const artistID = "eminem";

    const data = await spotify.fetchArtist(authToken, artistID);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyArtistUrl + `/${artistID}`);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("fetchRelatedArtist() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";
    const artistID = "eminem";

    const data = await spotify.fetchRelatedArtist(authToken, artistID);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyArtistUrl + `/${artistID}/related-artists`);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("followArtist() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";
    const artistID = "eminem";

    const data = await spotify.followArtist(authToken, artistID);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyFollowUrl + `?type=artist&ids=${artistID}`);
    expect(fetch.mock.calls[0][1].method).toBe("PUT");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");
});

test("unFollowArtist() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";
    const artistID = "eminem";

    const data = await spotify.unFollowArtist(authToken, artistID);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyFollowUrl + `?type=artist&ids=${artistID}`);
    expect(fetch.mock.calls[0][1].method).toBe("DELETE");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");
});

test("checkFollowing() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";
    const artistID = "eminem";

    const data = await spotify.checkFollowing(authToken, artistID);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyFollowUrl + `/contains?type=artist&ids=${artistID}`);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});

test("fetchTrack() fetches from Spotify", async () => {
    // Set up dummy input data
    const authToken = "abc123";
    const trackId = "Rap God";

    const data = await spotify.fetchTrack(authToken, trackId);

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch.mock.calls[0][0]).toBe(spotifyTrackUrl + `/${trackId}`);
    expect(fetch.mock.calls[0][1].method).toBe("GET");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`Bearer ${authToken}`);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
    expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");

    // Returned data should be that returned by the async call to json()
    expect(data).toBe(JSON_MOCK_VALUE);
});
