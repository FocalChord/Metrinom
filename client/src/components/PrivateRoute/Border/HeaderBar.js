import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
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
}));

const HeaderBar = ({ routes }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const isRootRoute = routes.map((i) => i.path).includes(location.pathname);

    return (
        <AppBar className={classes.appBar} position="fixed" color="default">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    className={classes.backButton}
                    onClick={() => history.goBack()}
                    disabled={isRootRoute}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton color="inherit" edge="start" className={classes.forwardButton} onClick={() => history.goForward()}>
                    <ArrowForwardIosIcon />
                </IconButton>
                <div className={classes.grow} />
                <Button
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
