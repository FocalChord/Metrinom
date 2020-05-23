import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

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

const SideDrawer = ({ routes }) => {
    const classes = useStyles();

    const drawerContent = (
        <div>
            <Box style={{ padding: 10, textAlign: "center" }}>
                <img alt={"Metrinom Logo"} src={MetrinomNoIcon} />
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
