import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Fab,
    Fade,
    Grid,
    Slider,
    Snackbar,
    SnackbarContent,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { GenreSeeds, Logger, SpotifyClient } from "../../utils";

const useStyles = makeStyles((theme) => ({
    list: {
        width: "100%",
    },
    header: {
        marginBottom: theme.spacing(1),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        outline: "none",
        color: "white",
        backgroundColor: "#1DB954",
    },
    title: {
        fontWeight: "bold",
    },
    snackbar: {
        [theme.breakpoints.down("xs")]: {
            bottom: 90,
        },
        backgroundColor: "#1DB954",
    },
    snackbarContent: {
        color: "inherit",
        textAlign: "center",
        backgroundColor: "#1DB954",
    },
    danceability: {
        color: "rgba(255, 99, 132, 0.7)",
    },
    energy: {
        color: "rgba(255, 159, 64, 0.7)",
    },
    liveness: {
        color: "rgba(104, 132, 245, 0.7)",
    },
    popularity: {
        color: "rgba(54, 162, 235, 0.7)",
    },
    valence: {
        color: "rgba(153, 102, 255, 0.7)",
    },
}));

const PlaylistCreate = ({ from, data, disabled }) => {
    const classes = useStyles();
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dialog, setDialog] = useState(false);
    const [danceability, setDanceability] = useState(0.5);
    const [energy, setEnergy] = useState(0.5);
    const [liveness, setLiveness] = useState(0.5);
    const [popularity, setPopularity] = useState(50);
    const [valence, setValence] = useState(0.5);

    const createPlaylist = async () => {
        if (from === "tracks" || from === "artists" || from === "singleTrack") {
            try {
                Logger.debug(data);
                await SpotifyClient.makePlaylist(data);
                setSnackbarMessage("Playlist has been created");
                setSnackbar(true);
                setDialog(false);
            } catch (e) {
                Logger.error(e);
            }
        } else if (from === "genres") {
            try {
                const genres = data.map((g) => g.name);
                const metrics = {
                    target_danceability: danceability,
                    target_energy: energy,
                    target_liveness: liveness,
                    target_popularity: popularity,
                    target_valence: valence,
                };

                // Get unique genre seeds
                const genreSeeds = [...new Set(genres.map((g) => GenreSeeds.getGenreSeed(g)))];

                await SpotifyClient.makePlaylistFromGenres(genreSeeds, metrics);
                setSnackbarMessage("Playlist has been created");
                setSnackbar(true);
                setDialog(false);
            } catch (e) {
                Logger.error(e);
            }
        }
    };

    const updateDanceability = (_, newValue) => {
        setDanceability(newValue);
    };

    const updateEnergy = (_, newValue) => {
        setEnergy(newValue);
    };

    const updateLiveness = (_, newValue) => {
        setLiveness(newValue);
    };

    const updatePopularity = (_, newValue) => {
        setPopularity(newValue);
    };

    const updateValence = (_, newValue) => {
        setValence(newValue);
    };

    return (
        <React.Fragment>
            <Tooltip
                style={{ backgroundColor: "#1DB954" }}
                title={
                    from === "tracks"
                        ? "Create Playlist from your Top Tracks"
                        : from === "artists"
                        ? "Create Playlist from this Artist"
                        : from === "genres"
                        ? "Create Playlist from up to 5 Selected Genres"
                        : "Created Playlist from this Track"
                }
                placement="left-start"
                aria-label="add"
            >
                <span>
                    <Fab disabled={disabled} variant="extended" className={classes.fab} onClick={() => setDialog(true)}>
                        Create playlist
                    </Fab>
                </span>
            </Tooltip>

            <Dialog color="primary" open={dialog}>
                <DialogTitle>Create Playlist</DialogTitle>

                {from === "tracks" && (
                    <React.Fragment>
                        <DialogContent>
                            <DialogContentText>Create a Playlist for your Top Tracks?</DialogContentText>
                        </DialogContent>
                    </React.Fragment>
                )}
                {from === "singleTrack" && (
                    <React.Fragment>
                        <DialogContent>
                            <DialogContentText>Create a Playlist based on this Track?</DialogContentText>
                        </DialogContent>
                    </React.Fragment>
                )}
                {from === "artists" && (
                    <React.Fragment>
                        <DialogContent>
                            <DialogContentText>Create a Playlist based on this Artist?</DialogContentText>
                        </DialogContent>
                    </React.Fragment>
                )}

                {from === "genres" && (
                    <React.Fragment>
                        <DialogContent>
                            <DialogContentText>
                                Create a Playlist based on {data.length > 1 ? "these " + data.length : "this single"} Genre
                                {data.length > 1 ? "s" : ""}:
                            </DialogContentText>
                            <Grid container direction="row" alignItems="flex-start">
                                {data.map((g) => (
                                    <Typography
                                        key={g.rank}
                                        style={{
                                            borderStyle: "solid",
                                            borderWidth: "1px",
                                            borderRadius: "10px",
                                            borderColor: "#1DB954",
                                            margin: "4px",
                                            padding: "4px",
                                        }}
                                    >
                                        {g.nameUppercase}
                                    </Typography>
                                ))}
                            </Grid>
                            <Divider style={{ margin: "10px" }} variant="middle" />
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography>Danceability</Typography>
                                    <Slider
                                        className={classes.danceability}
                                        value={danceability}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        valueLabelDisplay="auto"
                                        onChange={updateDanceability}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>Energy</Typography>
                                    <Slider
                                        className={classes.energy}
                                        value={energy}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        valueLabelDisplay="auto"
                                        onChange={updateEnergy}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>Liveness</Typography>
                                    <Slider
                                        className={classes.liveness}
                                        value={liveness}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        valueLabelDisplay="auto"
                                        onChange={updateLiveness}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>Popularity</Typography>
                                    <Slider
                                        className={classes.popularity}
                                        value={popularity}
                                        min={0}
                                        max={100}
                                        step={1}
                                        valueLabelDisplay="auto"
                                        onChange={updatePopularity}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>Valence</Typography>
                                    <Slider
                                        className={classes.valence}
                                        value={valence}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        valueLabelDisplay="auto"
                                        onChange={updateValence}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </React.Fragment>
                )}

                <DialogActions>
                    <Button style={{ outline: "none" }} onClick={() => setDialog(false)}>
                        Cancel
                    </Button>
                    <Button style={{ outline: "none", backgroundColor: "#1DB954" }} onClick={() => createPlaylist()} autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={snackbar}
                autoHideDuration={3500}
                className={classes.snackbar}
                TransitionComponent={Fade}
                onClose={() => setSnackbar(false)}
            >
                <SnackbarContent
                    className={classes.snackbarContent}
                    message={snackbarMessage}
                    action={
                        <Button color="inherit" size="small" onClick={() => setSnackbar(false)}>
                            Close
                        </Button>
                    }
                />
            </Snackbar>
        </React.Fragment>
    );
};

export default PlaylistCreate;
