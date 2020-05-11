import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HistoryIcon from "@material-ui/icons/History";
import MicIcon from "@material-ui/icons/Mic";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import React from "react";
import { Link } from "react-router-dom";

const routes = [
    { name: "Home", path: "/", icon: <MicIcon /> },
    { name: "Top Genres", path: "/genres", icon: <MusicNoteIcon /> },
    { name: "Top Artists", path: "/artists", icon: <MusicNoteIcon /> },
    { name: "Top Tracks", path: "/tracks", icon: <MusicNoteIcon /> },
    { name: "Recently Played", path: "/genres", icon: <MusicNoteIcon /> },
    { name: "Profile", path: "/profile/:user", icon: <HistoryIcon /> },
];

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

const SideDrawer = () => {
    const classes = useStyles();

    const drawerContent = (
        <div>
            <Box style={{ padding: 10, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom className={classes.title}>
                    Metrinom
                </Typography>
            </Box>
            <Divider />
            <List>
                {routes.map((route, index) => (
                    <ListItem component={Link} button key={index} to={route.path}>
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer}>
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawerContent}
            </Drawer>
        </nav>
    );
};

export default SideDrawer;
