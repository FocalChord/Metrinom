const users = ["user-read-email", "user-read-private"];
const playlists = ["playlist-modify-public", "playlist-modify-private"];
const libraryHistory = ["user-top-read", "user-read-recently-played"];
const follow = ["user-follow-modify", "user-follow-read"];

const spotifyAuthScope = [...users, ...playlists, ...libraryHistory, ...follow];

module.exports = spotifyAuthScope;
