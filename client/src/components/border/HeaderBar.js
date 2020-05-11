import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import CookieManager from "../../utils/CookieManager";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    logout: {
        [theme.breakpoints.only("xs")]: {
            display: "none",
        },
    },
    grow: {
        flexGrow: 1,
    },
}));

const HeaderBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar} color="default">
            <Toolbar>
                <IconButton color="inherit" edge="start" className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <div className={classes.grow} />
                <Button
                    color="inherit"
                    className={classes.logout}
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
