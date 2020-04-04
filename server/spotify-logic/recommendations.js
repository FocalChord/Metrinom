async function getRecomendations(seedArtist, seedTracks, seedGenres, authToken) {
    const headers = {
        Authorization: "Bearer " + authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const response = await fetch(
        spotifyRecommendationUrl +
            `/?limit=20&seed_artist=${seedArtist}&seed_tracks=${seedTracks}&seed_genres=${seedGenres}&min_energy=0.4&min_popularity=50`,
        { method: "GET", headers: headers },
    );
    const json = await response.json();

    return json;
}
