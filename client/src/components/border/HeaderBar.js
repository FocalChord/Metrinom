import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import CookieManager from "../../utils/CookieManager";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
}));

const HeaderBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <IconButton color="inherit" edge="start" className={classes.menuButton}>
                    <MenuIcon />
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
