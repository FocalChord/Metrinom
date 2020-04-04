// function to sort genres into a list of most popular in json format
const findGenres = (data) => {
    const genresDict = {};
    const topGenres = [];
    // Populates the dictionary of genres
    for (let i = 0; i < data.items.length; i++) {
        let genres = data.items[i].genres;
        for (let j = 0; j < genres.length; j++) {
            if (genresDict[genres[j]] != null) {
                genresDict[genres[j]] = genresDict[genres[j]] + 1;
            } else {
                genresDict[genres[j]] = 1;
            }
        }
    }
    for (let g in genresDict) {
        topGenres.push([g, genresDict[g]]);
    }
    const topGenreJson = {
        genres: topGenres.sort(comparator),
    };
    return topGenreJson;
};

// function to sort the genres
const comparator = (a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
};

module.exports = { findGenres };
