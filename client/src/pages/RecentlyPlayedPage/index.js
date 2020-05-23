import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MetrinomContext } from "../../context/MetrinomContext";
import { SpotifyClient } from "../../utils";
import { MusicLoader, LoaderWrapper } from "../../components";

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
}));

const mapRecentlyPlayedTracks = (response) => {
    return response.items.map((item) => {
        const { track } = item;
        const { album, name } = track;
        const { artists } = album;

        const d1 = new Date(); // Today
        const d2 = new Date(item.played_at); // Date the track was played at
        const value = Math.abs(d1 - d2); // Find difference in millseconds

        const duration = moment.duration(value);
        const seconds = duration.seconds();
        const minutes = duration.minutes();
        const hours = duration.hours();
        const day = duration.days();

        let dateString = "";

        if (minutes === 0 && hours === 0 && day === 0) {
            dateString = `${seconds} seconds ago`;
        } else if (hours === 0 && day === 0) {
            dateString = `${minutes} minutes ago`;
        } else if (day === 0) {
            dateString = `${hours} hours ago`;
        } else {
            dateString = `${day} day ago`;
        }

        return {
            trackId: track.id,
            albumArt: album.images[2].url,
            albumName: album.name,
            artistName: artists[0].name,
            trackName: name,
            dateString,
        };
    });
};

const RecentlyPlayedPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [tracks, setTracks] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        SpotifyClient.getRecentTracks().then((response) => {
            if (!isMounted) return;
            setTracks(mapRecentlyPlayedTracks(response));
            setIsLoading(false);
            setInternalLoading(false);
        });

        return () => {
            isMounted = false;
        };

        // eslint-disable-next-line
    }, []);

    return (
        <LoaderWrapper>
            <div maxWidth="text-center">
                <Box className={classes.header}>
                    <Typography variant="h4" gutterBottom className={classes.title}>
                        Recently Played
                    </Typography>
                </Box>

                {internalLoading && <MusicLoader internal={true} />}

                {!internalLoading && (
                    <div>
                        {tracks ? (
                            <List>
                                {tracks.map((track, idx) => (
                                    <Box key={idx}>
                                        <ListItem onClick={() => history.push(`/track/${track.trackId}`)} button>
                                            <ListItemAvatar>
                                                <Avatar style={{ borderRadius: 0, width: 65, height: 65 }} src={track.albumArt} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                style={{ paddingLeft: 20 }}
                                                primary={track.trackName}
                                                secondary={
                                                    <React.Fragment>
                                                        {track.artistName}
                                                        <br />
                                                        {track.albumName}
                                                    </React.Fragment>
                                                }
                                            />
                                            <ListItemSecondaryAction>{track.dateString}</ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="inset" />
                                    </Box>
                                ))}
                            </List>
                        ) : (
                            <h1>No Recently Played data available :(</h1>
                        )}
                    </div>
                )}
            </div>
        </LoaderWrapper>
    );
};

export default RecentlyPlayedPage;
