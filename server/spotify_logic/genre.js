// function to sort genres into a list of most popular in json format
module.exports = {
    findGenres: function (data) {
        var genresDict = {};
        var topGenres = [];
        // Populates the dictionary of genres
        for (var i = 0; i < data.items.length; i++) {
            var genres = data.items[i].genres;
            for (var j = 0; j < genres.length; j++) {
                if (genresDict[genres[j]] != null) {
                    genresDict[genres[j]] = genresDict[genres[j]] + 1;
                } else {
                    genresDict[genres[j]] = 1;
                }
            }
        }
        for (var g in genresDict) {
            topGenres.push([g, genresDict[g]]);
        }
        const topGenreJson = {
            genres: topGenres.sort(Comparator),
        };
        return topGenreJson;
    },
};

// function to sort the genres
function Comparator(a, b) {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
}
