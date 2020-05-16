import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Tooltip,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Snackbar,
    Fade,
    SnackbarContent,
    Typography,
    Grid,
} from "@material-ui/core";
import SpotifyClient from "../utils/SpotifyClient";
import logger from "../log/logger";

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
}));

const PlaylistCreate = (props) => {
    const classes = useStyles();
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dialog, setDialog] = useState(false);

    const { from, data } = props;

    const createPlaylist = async () => {
        if (from === "tracks") {
            try {
                logger.debug(data);
                await SpotifyClient.makePlaylist(data);
                setSnackbarMessage("Playlist has been created");
                setSnackbar(true);
                setDialog(false);
            } catch (e) {
                logger.error(e);
            }
        } else if (from === "genres") {
        }
    };

    return (
        <React.Fragment>
            <Tooltip
                style={{ outline: "none", backgroundColor: "#1DB954" }}
                title={from === "tracks" ? "Create Playlist from your Top Tracks" : "Create Playlist from up to 5 Selected Genres"}
                placement="left-start"
                aria-label="add"
            >
                <Fab disabled={props.disabled} variant="extended" className={classes.fab} onClick={() => setDialog(true)}>
                    Create playlist
                </Fab>
            </Tooltip>

            <Dialog color="primary" open={dialog}>
                <DialogTitle>Create Playlist</DialogTitle>

                {from === "tracks" && (
                    <React.Fragment>
                        <DialogContent>
                            <DialogContentText>Create Playlist for your Top tracks?</DialogContentText>
                        </DialogContent>
                    </React.Fragment>
                )}

                {from === "genres" && (
                    <React.Fragment>
                        <DialogContent>
                            <DialogContentText>Create playlist from these {data.length} Genres:</DialogContentText>
                            <Grid container direction="row" alignItems="flex-start" justify="space-between">
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
