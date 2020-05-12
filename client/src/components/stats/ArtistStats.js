import React, { useContext, useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, CardActionArea, Tab, Tabs, Box } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";

import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import MusicLoader from "../loaders/MusicLoader";

import LoaderWrapper from "../LoaderWrapper";
const useStyles = makeStyles(() => ({
    title: {
        fontWeight: "bold",
    },
    tabs: {
        "&:active": {
            outline: "none",
        },
        backgroundColor: "#1DB954",
    },
    hoverTab: {
        fontWeight: "bold",
        "&.Mui-selected": {
            outline: "none",
        },
        "&:hover": {
            outline: "none",
            color: "#1DB954",
            opacity: 1,
        },
    },
}));
const ArtistStats = () => {
    const classes = useStyles();
    const [artists, setArtists] = useState([]);
    const [timeFrame, setTimeframe] = useState("long_term");
    const { setIsLoading } = useContext(MetrinomContext);
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        SpotifyClient.getTopArtists("artists", timeFrame).then((r) => {
            setArtists(r.items);
            setIsLoading(false);
            setInternalLoading(false);
        });
    }, [timeFrame]);

    const muiBaseTheme = createMuiTheme();
    const handleChange = (_, newValue) => {
        setInternalLoading(true);
        setTimeframe(newValue);
    };

    const getTheme = (muiBaseTheme) => ({
        MuiCard: {
            root: {
                "&.MuiPostCard--02": {
                    borderRadius: muiBaseTheme.spacing.unit * 2, // 16px
                    transition: "0.3s",
                    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                    background: "#424242",
                    marginLeft: "auto",
                    paddingTop: "20",
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
                <Box className={classes.header}>
                    <Grid container direction="row" alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Typography variant="h4" className={classes.title}>
                                Your Top Artist
                            </Typography>
                        </Grid>
                        <Tabs
                            indicatorColor="primary"
                            color="primary"
                            value={timeFrame}
                            onChange={handleChange}
                            classes={{ indicator: classes.tabs }}
                            variant="fullWidth"
                        >
                            <Tab className={classes.hoverTab} label="All Time" value="long_term" />
                            <Tab className={classes.hoverTab} label="Last 6 months" value="medium_term" />
                            <Tab className={classes.hoverTab} label="Last 4 weeks" value="short_term" />
                        </Tabs>
                    </Grid>
                </Box>
                {internalLoading && <MusicLoader internal={true} />}
                {!internalLoading && (
                    <ul>
                        <Grid style={{ paddingTop: 30 }} container spacing={3}>
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
                )}
            </div>
        </LoaderWrapper>
    );
};

export default ArtistStats;
