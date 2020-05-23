import React, { useContext, useEffect, useState } from "react";
import { CardHeader, Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { MetrinomContext } from "../../context/MetrinomContext";
import { LoaderWrapper } from "../../components";
import { SpotifyClient } from "../../utils";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "pure-react-carousel/dist/react-carousel.es.css";
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
        nameUpper = nameUpper.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
        nameUpper = nameUpper.replace(/-([a-z])/g, (match) => match.toUpperCase()); // Capitalize every letter after a hyphen

        return {
            name: nameUpper,
            count: g[1],
        };
    });
};
const HomePage = () => {
    const { setIsLoading } = useContext(MetrinomContext);
    const history = useHistory();
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
            setArtist(artistRes.items[0]);
            setTrack(mapTracks(tracksRes.items[0]));
            setGenres(mapGenres(genresRes.genres.slice(0, 5)));
            setIsLoading(false);
        });
        return () => {
            isMounted = false;
        };
    }, []);
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
                            paddingLeft: 40,
                            letterSpacing: 1,
                            "text-align": "right",
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
                <CarouselProvider isPlaying interval={3000} infinite naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={3}>
                    <Slider style={{ maxHeight: 700 }}>
                        <Slide index={0}>
                            <Grid style={{ marginTop: 200 }} container direction="column" justify="center" alignItems="center">
                                <Card className={"MuiElevatedCard--01"}>
                                    <CardHeader
                                        className={"MuiCardHeader-root-3"}
                                        title={"Your #1 Track"}
                                        classes={{
                                            title: "MuiCardHeader-title",
                                        }}
                                    />
                                    <CardActionArea style={{ outline: "none" }} onClick={() => history.push(`/track/${track.trackId}`)}>
                                        <CardHeader
                                            className={"MuiCardHeader-root-1"}
                                            title={track.trackName}
                                            classes={{
                                                title: "MuiCardHeader-title",
                                            }}
                                        />
                                        <CardHeader
                                            className={"MuiCardHeader-root-2"}
                                            title={track.artistName}
                                            classes={{
                                                title: "MuiCardHeader-title",
                                            }}
                                        />
                                        <CardMedia className={"MuiCardContent-root"} image={track.trackImage} />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Slide>
                        <Slide index={1}>
                            <Grid item xs={12} style={{ marginTop: 200 }} container direction="column" justify="center" alignItems="center">
                                <Card className={"MuiElevatedCard--01"}>
                                    <CardHeader
                                        className={"MuiCardHeader-root-3"}
                                        title={"Your #1 Artist"}
                                        classes={{
                                            title: "MuiCardHeader-title",
                                        }}
                                    />
                                    <CardActionArea style={{ outline: "none" }} onClick={() => history.push(`/artist/${artist.id}`)}>
                                        <CardHeader
                                            className={"MuiCardHeader-root-1"}
                                            title={artist.name}
                                            classes={{
                                                title: "MuiCardHeader-title",
                                            }}
                                        />
                                        <CardHeader
                                            className={"MuiCardHeader-root-2"}
                                            title={artist.genres}
                                            classes={{
                                                title: "MuiCardHeader-title",
                                            }}
                                        />
                                        <CardMedia className={"MuiCardContent-root"} image={artist.images[0].url} />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Slide>
                        <Slide index={2}>
                            <Grid item xs={12} style={{ marginTop: 200 }} container direction="column" justify="center" alignItems="center">
                                <Card className={"MuiElevatedCard--01"} style={{ width: 700, height: 400 }}>
                                    <CardHeader
                                        className={"MuiCardHeader-root-3"}
                                        title={"Your Top 5 Genres"}
                                        classes={{
                                            title: "MuiCardHeader-title",
                                        }}
                                    />
                                    <BarChart
                                        style={{ margin: 40 }}
                                        width={600}
                                        height={350}
                                        data={genres}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid style={{ color: "white" }} strokeDasharray="3 3" />
                                        <XAxis stroke="white" dataKey="name" fill="#1DB954" />
                                        <YAxis />
                                        <Tooltip></Tooltip>
                                        <Bar dataKey="count" fill="#1DB954" />
                                    </BarChart>
                                </Card>
                            </Grid>
                        </Slide>
                    </Slider>
                </CarouselProvider>
            </MuiThemeProvider>
        </LoaderWrapper>
    );
};

export default HomePage;
