// function to sort genres into a list of most popular in json format
const findGenres = (data) => {
    const { items } = data;
    const genreCount = items
        .map((item) => item.genres)
        .filter((genres) => genres.length > 0)
        .flat()
        .map((genre) => genre.toString())
        .reduce(
            (acc, val) => ({
                ...acc,
                [val]: acc[val] ? acc[val] + 1 : 1,
            }),
            {},
        );

    const sortedGenreCount = Object.entries(genreCount)
        .reduce((acc, val) => [...acc, val], [])
        .sort((a, b) => b[1] - a[1]);

    return {
        genres: sortedGenreCount,
    };
};

module.exports = { findGenres };
