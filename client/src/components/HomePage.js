import React, { useContext, useEffect, useState } from "react";
import { CardHeader, Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

import { MetrinomContext } from "../context/MetrinomContext";
import LoaderWrapper from "./LoaderWrapper";
import SpotifyClient from "../utils/SpotifyClient";
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
    // const [genres, setGenres] = useState([]);

    useEffect(() => {
        SpotifyClient.getTopArtists("artists", "medium_term").then((r) => {
            setArtist(r.items[0]);
        });
        SpotifyClient.getTopTracks("tracks", "medium_term").then((r) => {
            setTrack(mapTracks(r.items[0]));
            // console.log(r.items[0]);
            setIsLoading(false);
        });
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
                <Carousel animation="slide" navButtonsAlwaysVisible={true}>
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
                    <Grid item xs={12} style={{ marginTop: 200 }} container direction="column" justify="center" alignItems="center">
                        <Card className={"MuiElevatedCard--01"}>
                            <CardHeader
                                className={"MuiCardHeader-root-3"}
                                title={"Your #1 Artist"}
                                classes={{
                                    title: "MuiCardHeader-title",
                                }}
                            />
                            <CardActionArea style={{ outline: "none" }} onClick={() => history.push(`/artists/${artist.id}`)}>
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
                </Carousel>
            </MuiThemeProvider>
        </LoaderWrapper>
    );
};

export default HomePage;
