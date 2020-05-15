import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
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
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
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
    },
    title: {
        fontWeight: "bold",
    },
    snackbar: {
        [theme.breakpoints.down("xs")]: {
            bottom: 90,
        },
    },
    snackbarContent: {
        backgroundColor: blue[600],
        color: "inherit",
        textAlign: "center",
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
            <Tooltip title="Create playlist" placement="left-start" aria-label="add">
                <Fab color="secondary" className={classes.fab} onClick={() => setDialog(true)}>
                    <PlaylistAddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={dialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Create Playlist</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Create playlist for your Top tracks?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)}>Cancel</Button>
                    <Button onClick={() => createPlaylist()} autoFocus>
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
