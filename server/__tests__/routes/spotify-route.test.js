const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express");
const spotifyRoute = require("../../routes/spotify-route");
const User = require("../../models/user");
const mockingoose = require("mockingoose").default;
const spotify = require("../../spotify-service");

jest.mock("../../routes/ensureAuthenticated");
const ensureAuthenticated = require("../../routes/ensureAuthenticated");
ensureAuthenticated.mockImplementation((req, res, next) => {
    next();
});

const SPOTIFY_DATA = { baked: "beans" };

const mockFetchTopArtistOrTracks = jest.spyOn(spotify, "fetchTopArtistOrTracks").mockImplementation(() => SPOTIFY_DATA);
const mockFetchAudioFeatures = jest.spyOn(spotify, "fetchAudioFeatures").mockImplementation(() => SPOTIFY_DATA);
const mockFetchRecomendations = jest.spyOn(spotify, "fetchRecomendations").mockImplementation(() => SPOTIFY_DATA);
const mockFetchTrackRecommendationsFromGenresAndMetrics = jest
    .spyOn(spotify, "fetchTrackRecommendationsFromGenresAndMetrics")
    .mockImplementation(() => SPOTIFY_DATA);
const mockFetchTopGenres = jest.spyOn(spotify, "fetchTopGenres").mockImplementation(() => SPOTIFY_DATA);
const mockFetchMakePlaylist = jest.spyOn(spotify, "fetchMakePlaylist").mockImplementation(() => SPOTIFY_DATA);
const mockFetchRecentTracks = jest.spyOn(spotify, "fetchRecentTracks").mockImplementation(() => SPOTIFY_DATA);
const mockFetchArtist = jest.spyOn(spotify, "fetchArtist").mockImplementation(() => SPOTIFY_DATA);
const mockFetchRelatedArtist = jest.spyOn(spotify, "fetchRelatedArtist").mockImplementation(() => SPOTIFY_DATA);
const mockFollowArtist = jest.spyOn(spotify, "followArtist").mockImplementation(() => null);
const mockUnFollowArtist = jest.spyOn(spotify, "unFollowArtist").mockImplementation(() => null);
const mockCheckFollowing = jest.spyOn(spotify, "checkFollowing").mockImplementation(() => SPOTIFY_DATA);
const mockFetchTrack = jest.spyOn(spotify, "fetchTrack").mockImplementation(() => SPOTIFY_DATA);

const USER_OBJ = [
    {
        spotifyUserId: "Dinith123",
        displayName: "Dinith",
        profilePic: "image.png",
        friends: ["Hong"],
        isPrivate: true,
        accessToken: "abc123",
        refreshToken: "xyz789",
    },
];

beforeAll(async (done) => {
    mockingoose(User).toReturn(USER_OBJ, "findOne");

    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/spotify", spotifyRoute);
    server = app.listen(3001, () => done());
});

afterAll((done) => {
    server.close(async () => {
        done();
    });
});

beforeEach(() => {
    jest.clearAllMocks();
});

test("GET /spotify/top", async () => {
    const resp = await fetch("http://localhost:3001/spotify/top", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchTopArtistOrTracks).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("GET spotify/top/genres", async () => {
    const resp = await fetch("http://localhost:3001/spotify/top/genres", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchTopGenres).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("GET /spotify/recommendations", async () => {
    const resp = await fetch("http://localhost:3001/spotify/recommendations", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchRecomendations).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("POST /spotify/playlist/create", async () => {
    const resp = await fetch("http://localhost:3001/spotify/playlist/create", {
        method: "POST",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchMakePlaylist).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("POST /spotify/playlist/createFromGenres", async () => {
    const resp = await fetch("http://localhost:3001/spotify/playlist/createFromGenres", {
        method: "POST",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchTrackRecommendationsFromGenresAndMetrics).toBeCalledTimes(1);
    expect(mockFetchMakePlaylist).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("GET /spotify/recent-played", async () => {
    const resp = await fetch("http://localhost:3001/spotify/recent-played", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchRecentTracks).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("GET /spotify/artist", async () => {
    const resp = await fetch("http://localhost:3001/spotify/artist?artistId=dummy", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchArtist).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("GET /spotify/relatedArtist", async () => {
    const resp = await fetch("http://localhost:3001/spotify/relatedArtist?artistId=dummy", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchRelatedArtist).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("PUT /spotify/artist/follow", async () => {
    const resp = await fetch("http://localhost:3001/spotify/artist/follow?artistId=dummy", {
        method: "PUT",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });

    expect(resp.status).toBe(204);
    expect(mockFollowArtist).toBeCalledTimes(1);
});

test("DELETE /spotify/artist/unfollow", async () => {
    const resp = await fetch("http://localhost:3001/spotify/artist/unfollow?artistId=dummy", {
        method: "DELETE",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });

    expect(resp.status).toBe(204);
    expect(mockUnFollowArtist).toBeCalledTimes(1);
});

test("GET /spotify/isFollowing", async () => {
    const resp = await fetch("http://localhost:3001/spotify/isFollowing?artistId=dummy", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockCheckFollowing).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});

test("GET /spotify/track", async () => {
    const resp = await fetch("http://localhost:3001/spotify/track?trackId=dummy", {
        method: "GET",
        headers: { authorization: USER_OBJ.spotifyUserId, "Content-Type": "application/json" },
    });
    const respJson = await resp.json();

    expect(resp.status).toBe(200);
    expect(mockFetchTrack).toBeCalledTimes(1);
    expect(respJson).toEqual(SPOTIFY_DATA);
});
