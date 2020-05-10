import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";
import { MetrinomContext } from "../../context/MetrinomContext";
import HeaderBar from "./HeaderBar";
import Loader from "./Loader";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
    },
}));

const Border = (props) => {
    const { isLoading, setIsLoading } = useContext(MetrinomContext);

    const location = useLocation();
    const lastLocation = useLastLocation();
    const classes = useStyles();

    useEffect(() => {
        if (!lastLocation || lastLocation.pathname !== location.pathname) {
            setIsLoading(true);
        }
    }, [setIsLoading, lastLocation, location]);

    return (
        <div className={classes.root}>
            <HeaderBar />
            <SideDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {isLoading && (
                    <Box className={classes.loader}>
                        <Loader />
                    </Box>
                )}
                {props.children}
            </main>
        </div>
    );
};

export default Border;
