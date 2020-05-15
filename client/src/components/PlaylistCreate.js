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
} from "@material-ui/core";
import SpotifyClient from "../utils/SpotifyClient";

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
    const { trackUris } = props;
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [dialog, setDialog] = useState(false);

    const createPlaylist = async () => {
        try {
            console.log(trackUris);
            await SpotifyClient.makePlaylist(trackUris);
            setSnackbarMessage("Playlist has been created");
            setSnackbar(true);
            setDialog(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <React.Fragment>
            <Tooltip
                style={{ outline: "none", backgroundColor: "#1DB954" }}
                title="Create playlist"
                placement="left-start"
                aria-label="add"
            >
                <Fab variant="extended" className={classes.fab} onClick={() => setDialog(true)}>
                    <Typography variant="h10" style={{ color: "white" }}>
                        Create playlist
                    </Typography>
                </Fab>
            </Tooltip>
            <Dialog color="primary" open={dialog}>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogContent>
                    <DialogContentText>Create playlist for your Top tracks?</DialogContentText>
                </DialogContent>
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
