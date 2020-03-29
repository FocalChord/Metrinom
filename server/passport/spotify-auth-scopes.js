const spotifyConnect = ["user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing"];
const users = ["user-read-email", "user-read-private"];
const playlists = ["playlist-read-collaborative", "playlist-modify-public", "playlist-read-private", "playlist-modify-private"];
const library = ["user-library-modify", "user-library-read"];
const libraryHistory = ["user-top-read", "user-read-playback-position", "user-read-recently-played"];

const spotifyAuthScope = [...spotifyConnect, ...users, ...playlists, ...library, ...libraryHistory];

module.exports = spotifyAuthScope;
