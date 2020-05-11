import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import MusicLoader from "../loaders/MusicLoader";
import LoaderWrapper from "../LoaderWrapper";

const useStyles = makeStyles((theme) => ({
    list: {
        width: "100%",
    },
    header: {
        marginBottom: theme.spacing(1),
    },
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
    buttons: {
        marginTop: theme.spacing(3),
    },
    internalLoader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
    },
}));

const TrackStats = () => {
    const classes = useStyles();
    const [tracks, setTracks] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);
    const [timeFrame, setTimeframe] = useState("long_term");
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        SpotifyClient.getTopTracks("tracks", timeFrame).then((r) => {
            setTracks(r.items);
            setIsLoading(false);
            setInternalLoading(false);
        });
    }, [timeFrame]);

    const handleChange = (_, newValue) => {
        setInternalLoading(true);
        setTimeframe(newValue);
    };

    return (
        <LoaderWrapper>
            <div className="text-center">
                <Box className={classes.header}>
                    <Grid container direction="row" alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Typography variant="h4" className={classes.title}>
                                Your Top Tracks
                            </Typography>
                        </Grid>
                        <Tabs
                            indicatorColor="primary"
                            color="primary"
                            value={timeFrame}
                            onChange={handleChange}
                            aria-label="tabs"
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
                        <List classes={classes.list}>
                            {tracks ? (
                                tracks.map((x, idx) => (
                                    <Box key={x.id}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar
                                                    style={{ borderRadius: 0, width: 65, height: 65 }}
                                                    src={x.album.images[0].url}
                                                ></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                style={{ paddingLeft: 20 }}
                                                primary={x.name}
                                                secondary={
                                                    <React.Fragment>
                                                        Artist - {x.album.artists[0].name}
                                                        <p></p>
                                                        Album - {x.album.name}
                                                    </React.Fragment>
                                                }
                                            />
                                            <div style={{ fontSize: 25 }}>{idx + 1}</div>
                                        </ListItem>
                                        <Divider variant="inset" />
                                    </Box>
                                ))
                            ) : (
                                <li>No Track data available :(</li>
                            )}
                        </List>
                    </ul>
                )}
            </div>
        </LoaderWrapper>
    );
};

export default TrackStats;
