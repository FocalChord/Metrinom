import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Avatar, Grid, Button, Box } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import AudioFeaturesChart from "../components/AudioFeaturesChart";
import { MetrinomContext } from "../context/MetrinomContext";
import SpotifyClient from "../utils/SpotifyClient";
import { useParams } from "react-router-dom";
import LoaderWrapper from "./LoaderWrapper";
import AudioFeaturesChart from "./AudioFeaturesChart";

const useStyles = makeStyles((theme) => ({
    container: {
        alignItems: "center",
    },
    name: {
        fontWeight: "bold",
    },
    avatar: {
        height: "100%",
        width: "100%",
    },
    artist: {
        marginTop: theme.spacing(0.5),
        fontWeight: "bold",
        color: grey[500],
    },
    album: {
        marginTop: theme.spacing(0.5),
        fontWeight: "bold",
        color: grey[500],
    },
    playButton: {
        marginTop: theme.spacing(4),
    },
}));

const TrackPage = () => {
    const classes = useStyles();
    const { setIsLoading } = useContext(MetrinomContext);
    const { trackId } = useParams();
    const [track, setTrack] = useState({
        album: {
            images: [],
            artists: [],
            name: "",
            release_date: "",
        },
        artists: [],
        name: "",
        external_urls: {
            spotify: "",
        },
    });
    const [features, setFeatures] = useState(null);

    useEffect(() => {
        Promise.all([SpotifyClient.getTrack(trackId), SpotifyClient.getAudioFeatures(trackId)]).then((values) => {
            const [trackRes, audioFeatureRes] = values;
            setTrack(trackRes);
            setFeatures(audioFeatureRes);
            setIsLoading(false);
        });
    }, [trackId, setIsLoading]);

    console.log(features);

    return (
        <LoaderWrapper>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={4}>
                    <Grid item md={4}>
                        {track.album.images.length > 0 && (
                            <Avatar variant="square" alt="Remy Sharp" className={classes.avatar} src={track.album.images[1].url} />
                        )}
                    </Grid>
                    <Grid item md={8}>
                        <Typography variant="h3" className={classes.name}>
                            {track.name}
                        </Typography>
                        <Typography variant="h5" className={classes.artist} style={{ color: "#9e9e9e" }}>
                            {track.album.artists.length > 0 ? track.album.artists[0].name : ""}
                        </Typography>
                        <Typography variant="body1" className={classes.album} style={{ color: "#9e9e9e" }}>
                            {track.album.name} · {track.album.release_date.split("-")[0]}
                        </Typography>
                        <Box className={classes.playButtonContainer}>
                            <Button
                                startIcon={<PlayArrowIcon />}
                                variant="outlined"
                                href={track.external_urls.spotify}
                                className={classes.playButton}
                            >
                                PLAY ON SPOTIFY
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item md={12}>
                        <Typography variant="h5" gutterBottom>
                            Audio Features
                        </Typography>
                        {features && <AudioFeaturesChart features={features} />}
                    </Grid>
                </Grid>
            </Container>
        </LoaderWrapper>
    );
};

export default TrackPage;
