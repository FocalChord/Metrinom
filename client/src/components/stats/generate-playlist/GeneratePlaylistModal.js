import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, makeStyles } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    modal: {
        width: "1000px",
    },
}));

const GeneratePlaylistModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);

    const handleClose = () => {
        setOpen(false);
        props.close(true);
    };

    return (
        <Dialog
            className={classes.modal}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Create a Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>Selected Genres:</DialogContentText>
                {props.genres.map((g) => (
                    <DialogContentText>{g.selected && g.nameUppercase}</DialogContentText>
                ))}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button style={{ color: "#1DB954" }}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GeneratePlaylistModal;
