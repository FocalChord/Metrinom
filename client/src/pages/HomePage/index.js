import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useContext, useEffect, useState } from "react";
import { LoaderWrapper } from "../../components";
import { MetrinomContext } from "../../context/MetrinomContext";
import { SpotifyClient } from "../../utils";
import NumberOneArtistCard from "./NumberOneArtistCard";
import NumberOneTrackCard from "./NumberOneTrackCard";
import TopGenreGraph from "./TopGenreGraph";
import { Typography } from "@material-ui/core";

const mapTracks = (item) => {
    const { album, name, id, uri } = item;
    return {
        artistName: album.artists[0].name,
        albumName: album.name,
        trackImage: album.images[0].url,
        trackName: name,
        trackId: id,
        uri: uri,
    };
};
const mapGenres = (resp) => {
    return resp.map((g) => {
        let nameUpper = g[0];
        if (nameUpper !== undefined) {
            nameUpper = nameUpper.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
            nameUpper = nameUpper.replace(/-([a-z])/g, (match) => match.toUpperCase()); // Capitalize every letter after a hyphen
        }

        return {
            name: nameUpper,
            count: g[1],
        };
    });
};

const muiBaseTheme = createMuiTheme();

const getTheme = () => ({
    MuiCard: {
        root: {
            "&.MuiElevatedCard--01": {
                backgroundColor: "rgba(66, 66, 66, 0.5)",
                width: 600,
                height: 350,
                overflow: "visible",
                outline: "none",
                "& .MuiCardHeader-root-1": {
                    minwidth: 300,
                    backgroundColor: "rgba(29, 185, 84, 1)",
                    color: "#FFFFFF",
                    boxShadow: "4px 4px 20px 1px rgba(0, 0, 0, 0.2)",
                    marginLeft: 300,
                    marginTop: 150,
                    position: "absolute",
                    "& .MuiCardHeader-title": {
                        color: "#ffffff",
                        fontWeight: 900,
                        "font-size": 30,
                        letterSpacing: 1,
                        "text-align": "right",
                        "white-space": "nowrap",
                    },
                },
                "& .MuiCardHeader-root-2": {
                    backgroundColor: "#424242",
                    color: "#FFFFFF",
                    boxShadow: "4px 4px 20px 1px rgba(0, 0, 0, 0.2)",
                    marginLeft: 440,
                    marginTop: 210,
                    position: "absolute",
                    "& .MuiCardHeader-title": {
                        color: "#ffffff",
                        fontWeight: 200,
                        "font-size": 15,
                        letterSpacing: 1,
                        "text-align": "center",
                        "white-space": "nowrap",
                    },
                },
                "& .MuiCardHeader-root-3": {
                    backgroundColor: "rgba(29, 185, 84, 0.5)",
                    color: "#FFFFFF",
                    boxShadow: "4px 4px 20px 1px rgba(0, 0, 0, 0.2)",
                    marginLeft: 470,
                    marginTop: -40,
                    position: "absolute",
                    "& .MuiCardHeader-title": {
                        color: "#ffffff",
                        fontWeight: 900,
                        "font-size": 40,
                        letterSpacing: 1,
                        "text-align": "center",
                        "white-space": "nowrap",
                    },
                },
                "& .MuiCardContent-root": {
                    marginTop: -50,
                    marginLeft: -50,
                    width: 370,
                    height: 370,
                    outline: "none",
                },
            },
        },
    },
});

const HomePage = () => {
    const { setIsLoading } = useContext(MetrinomContext);
    const [artist, setArtist] = useState({
        name: "",
        genres: [],
        popularity: 0,
        images: [
            {
                url: "",
            },
        ],
        id: "",
    });
    const [track, setTrack] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        let isMounted = true;

        Promise.all([
            SpotifyClient.getTopArtists("artists", "medium_term"),
            SpotifyClient.getTopTracks("tracks", "medium_term"),
            SpotifyClient.getTopGenres(),
        ]).then((values) => {
            if (!isMounted) return;
            const [artistRes, tracksRes, genresRes] = values;
            if (artistRes.items.length > 0) {
                setArtist(artistRes.items[0]);
            }

            if (tracksRes.items.length > 0) {
                setTrack(mapTracks(tracksRes.items[0]));
            }

            setGenres(mapGenres(genresRes.genres.slice(0, 5)));
            setIsLoading(false);
        });

        return () => {
            isMounted = false;
        };

        // eslint-disable-next-line
    }, []);

    return (
        <LoaderWrapper>
            <MuiThemeProvider
                theme={createMuiTheme({
                    typography: {
                        useNextVariants: true,
                    },
                    overrides: getTheme(muiBaseTheme),
                })}
            >
                {artist.name && track.trackName && (
                    <CarouselProvider isPlaying interval={3000} infinite naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={3}>
                        <Slider style={{ maxHeight: 700 }}>
                            <Slide index={0}>
                                <NumberOneTrackCard track={track} />
                            </Slide>
                            <Slide index={1}>
                                <NumberOneArtistCard artist={artist} />
                            </Slide>
                            <Slide index={2}>
                                <TopGenreGraph genres={genres} />
                            </Slide>
                        </Slider>
                    </CarouselProvider>
                )}

                {!(artist.name && track.trackName) && (
                    <div className="flex items-center justify-center h-full w-full fixed">
                        <Typography variant="h2">No Statistics Available :( </Typography>
                    </div>
                )}
            </MuiThemeProvider>
        </LoaderWrapper>
    );
};

export default HomePage;
