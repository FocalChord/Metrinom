import { Box, Grid, List, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoaderWrapper, MusicLoader, PlaylistCreate } from "../../components";
import { MetrinomContext } from "../../context/MetrinomContext";
import { SpotifyClient } from "../../utils/";
import TrackListItem from "./TrackListItem";

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
}));

const mapTracks = (response) => {
    return response.items.map((item) => {
        const { album, name, id, uri } = item;

        return {
            artistName: album.artists[0].name,
            albumName: album.name,
            trackImage: album.images[0].url,
            trackName: name,
            trackId: id,
            uri: uri,
        };
    });
};

const TopTracksPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { setIsLoading } = useContext(MetrinomContext);
    const [tracks, setTracks] = useState([]);
    const [timeFrame, setTimeframe] = useState("long_term");
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        SpotifyClient.getTopTracks("tracks", timeFrame).then((response) => {
            if (!isMounted) return;
            setTracks(mapTracks(response));
            setIsLoading(false);
            setInternalLoading(false);
        });

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line
    }, [timeFrame]);

    const handleChange = (_, newValue) => {
        if (newValue === timeFrame) return;
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
                        <List className={classes.list}>
                            {tracks ? (
                                tracks.map((track, idx) => (
                                    <TrackListItem key={track.trackId} push={history.push} track={track} idx={idx} />
                                ))
                            ) : (
                                <li>No Track data available :(</li>
                            )}
                        </List>
                    </ul>
                )}
            </div>
            <PlaylistCreate from="tracks" data={tracks.map((track) => track.uri)} />
        </LoaderWrapper>
    );
};

export default TopTracksPage;
