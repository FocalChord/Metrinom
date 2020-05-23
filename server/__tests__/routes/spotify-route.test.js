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
const mockFollowArtist = jest.spyOn(spotify, "followArtist").mockImplementation(() => SPOTIFY_DATA);
const mockUnFollowArtist = jest.spyOn(spotify, "unFollowArtist").mockImplementation(() => SPOTIFY_DATA);
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

test("GET /top/genres", async () => {
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
