import React, { useContext, useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, CardActionArea } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import LoaderWrapper from "../LoaderWrapper";

const ArtistStats = () => {
    const [artists, setArtists] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        SpotifyClient.getTopArtists().then((r) => {
            setArtists(r.items);
            console.log(r.items);
            setIsLoading(false);
        });
    }, []);
    const muiBaseTheme = createMuiTheme();

    const getTheme = (muiBaseTheme) => ({
        MuiCard: {
            root: {
                "&.MuiPostCard--02": {
                    borderRadius: muiBaseTheme.spacing.unit * 2, // 16px
                    transition: "0.3s",
                    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                    background: "#424242",
                    marginLeft: "auto",
                    overflow: "initial",
                    width: "100%",
                    maxWidth: 300,
                    padding: `${muiBaseTheme.spacing.unit * 2}px 0`,
                    "&:hover": {
                        transform: "translateY(-7px)",
                        boxShadow: "0 4px 20px 0 #1DB954",
                    },

                    "& .MuiCardMedia-root": {
                        flexShrink: 0,
                        width: "55%",
                        height: "55%",
                        paddingTop: "55%",
                        transform: "translateX(-24%)",
                        borderRadius: muiBaseTheme.spacing.unit * 2, // 16
                        overflow: "hidden",
                    },
                    "& .MuiCardContent-root": {
                        textAlign: "left",
                        "text-overflow": "ellipsis",
                        "white-space": "nowrap",
                        overflow: "hidden",
                        paddingLeft: 0,
                        padding: muiBaseTheme.spacing.unit * 2,
                    },
                    "& .MuiTypography--heading": {
                        color: "white",
                    },
                    "& .MuiTypography--subheading": {
                        marginBottom: muiBaseTheme.spacing.unit * 2,
                        color: "grey",
                    },
                    "& .MuiCardContent--actionarea": {
                        display: "flex",
                        "justify-content": "flex-start",

                        outline: "none",
                    },
                },
            },
        },
    });
    return (
        <LoaderWrapper>
            <div className="text-center">
                <h1>Your top Artists are</h1>
                <ul>
                    <Grid container spacing={3}>
                        {artists ? (
                            artists.map((artist, idx) => (
                                <Grid item key={artist.id} xs={12} sm={10} md={3}>
                                    <MuiThemeProvider
                                        theme={createMuiTheme({
                                            typography: {
                                                useNextVariants: true,
                                            },
                                            overrides: getTheme(muiBaseTheme),
                                        })}
                                    >
                                        <Card className={"MuiPostCard--02"}>
                                            <CardActionArea className={"MuiCardContent--actionarea"}>
                                                <CardMedia className={"MuiCardMedia-root"} image={artist.images[0].url} />
                                                <CardContent className={"MuiCardContent-root"}>
                                                    <Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
                                                        {artist.name}
                                                    </Typography>
                                                    <Typography className={"MuiTypography--subheading"}>{artist.genres[0]}</Typography>
                                                    <Typography className={"MuiTypography--subheading"}>#{idx + 1}</Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </MuiThemeProvider>
                                </Grid>
                            ))
                        ) : (
                            <li>No Artist data available :(</li>
                        )}
                    </Grid>
                </ul>
            </div>
        </LoaderWrapper>
    );
};

export default ArtistStats;
