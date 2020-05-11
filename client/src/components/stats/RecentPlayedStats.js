import {
    Avatar,
    Box,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";

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

        if (minutes === 0 && hours === 0 && day == 0) {
            dateString = `Played ${seconds} seconds ago`;
        } else if (hours === 0 && day === 0) {
            dateString = `Played ${minutes} minutes ago`;
        } else if (day === 0) {
            dateString = `Played ${hours} hours ago`;
        } else {
            dateString = `Played ${day} day ago`;
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

const RecentlyPlayedStats = ({ history }) => {
    const classes = useStyles();
    const [tracks, setTracks] = useState([]);
    const { isLoading, setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        SpotifyClient.getRecentTracks().then((response) => {
            setTracks(mapRecentlyPlayedTracks(response));
            setIsLoading(false);
        });
    }, []);

    console.log(tracks);

    return (
        <React.Fragment>
            {!isLoading && (
                <Container maxWidth="lg">
                    <Box className={classes.header}>
                        <Typography variant="h4" gutterBottom className={classes.title}>
                            Recently Played
                        </Typography>
                    </Box>

                    <List className={classes.root}>
                        {tracks.map((track, idx) => {
                            return (
                                <Box key={idx}>
                                    <ListItem alignItems="flex-start" onClick={() => history.push(`/track/${track.trackId}`)} button>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={track.albumArt} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={track.trackName}
                                            secondary={
                                                <React.Fragment>
                                                    {track.artistName} · {track.albumName}
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemSecondaryAction>{track.dateString}</ListItemSecondaryAction>
                                    </ListItem>
                                </Box>
                            );
                        })}
                    </List>
                </Container>
            )}
        </React.Fragment>
    );
};

export default RecentlyPlayedStats;
