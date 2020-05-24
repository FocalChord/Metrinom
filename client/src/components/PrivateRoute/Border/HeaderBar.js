import { AppBar, Button, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CookieManager } from "../../../utils";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
    backButton: {
        marginRight: theme.spacing(2),
    },
    forwardButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    buttonLogout: {
        backgroundColor: "#1DB954",
        "&:hover": {
            backgroundColor: "#4AC776",
            color: "#FFF",
        },
    },
}));

const HeaderBar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position="fixed" color="default">
            <Toolbar>
                <div className={classes.grow} />
                <Button
                    className={classes.buttonLogout}
                    color="inherit"
                    onClick={() => {
                        CookieManager.removeUserToken();
                        window.location.assign(window.location);
                    }}
                >
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
