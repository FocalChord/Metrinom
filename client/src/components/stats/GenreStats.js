import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import LoaderWrapper from "../LoaderWrapper";
import PieChart from "./PieChart";
import MusicLoader from "../loaders/MusicLoader";

const useStyles = makeStyles((theme) => ({
    list: {
        width: "100%",
    },
    header: {
        marginBottom: theme.spacing(1),
    },
    title: {
        fontWeight: "bold",
    },
    tabs: {
        "&:active": {
            outline: "none",
        },
        backgroundColor: "#1DB954",
    },
    hoverTab: {
        fontWeight: "bold",
        "&.Mui-selected": {
            outline: "none",
        },
        "&:hover": {
            outline: "none",
            color: "#1DB954",
            opacity: 1,
        },
    },
    buttons: {
        marginTop: theme.spacing(3),
    },
    // container: {
    //     height: "100%",
    // },
    // toggleContainer: {
    //     margin: theme.spacing(2, 0),
    // },
}));

const mapDataToPieChart = (genres) => {
    const randColor = () => `hsl(${Math.round(Math.random() * 360)}, 70%, 50%)`;
    return genres.slice(0, 10).map((g) => ({
        id: g.nameUppercase,
        label: g.nameUppercase,
        value: g.number,
        color: randColor(),
    }));
};

const mapGenres = (resp) => {
    return resp.genres.map((g, i) => {
        let nameUpper = g[0];
        nameUpper = nameUpper.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
        nameUpper = nameUpper.replace(/-([a-z])/g, (match) => match.toUpperCase()); // Capitalize every letter after a hyphen

        return {
            rank: i,
            name: g[0],
            nameUppercase: nameUpper,
            number: g[1],
        };
    });
};

const GenreStats = () => {
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);
    const [view, setView] = useState("pie");
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        SpotifyClient.getTopGenres().then((resp) => {
            setGenres(mapGenres(resp));
            setIsLoading(false);
            setInternalLoading(false);
        });
    }, [view]);

    const handleChange = (_, newValue) => {
        setInternalLoading(true);
        setView(newValue);
    };

    return (
        <LoaderWrapper>
            <div className="text-center">
                <Box className={classes.header}>
                    <Grid container direction="row" alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Typography variant="h4" gutterBottom className={classes.title}>
                                Your Top Genres
                            </Typography>
                        </Grid>
                        <Tabs
                            indicatorColor="primary"
                            color="primary"
                            value={view}
                            onChange={handleChange}
                            classes={{ indicator: classes.tabs }}
                            variant="fullWidth"
                        >
                            <Tab className={classes.hoverTab} label="Pie Chart" value="pie" />
                            <Tab className={classes.hoverTab} label="List" value="list" />
                        </Tabs>
                    </Grid>
                </Box>

                {internalLoading && <MusicLoader internal={true} />}

                {!internalLoading && (
                    <div>
                        {genres ? (
                            <div>
                                {view == "pie" ? (
                                    <div style={{ height: 1000 }}>
                                        <PieChart data={mapDataToPieChart(genres)} />
                                    </div>
                                ) : (
                                    <List>
                                        {genres.map((g) => (
                                            <Box key={g.rank}>
                                                <ListItem button onClick={() => window.alert("TEMP")}>
                                                    <ListItemAvatar>
                                                        <Avatar style={{ borderRadius: 0, width: 65, height: 65 }} src={g.rank}></Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        style={{ paddingLeft: 20 }}
                                                        primary={g.nameUppercase}
                                                        secondary={<React.Fragment>Number of Tracks - {g.number}</React.Fragment>}
                                                    />
                                                    <div style={{ fontSize: 25, color: "#1DB954" }}>{g.rank + 1}</div>
                                                </ListItem>
                                                <Divider variant="inset" />
                                            </Box>
                                        ))}
                                    </List>
                                )}
                            </div>
                        ) : (
                            <h1>No Genre data available</h1>
                        )}
                    </div>
                )}
            </div>
        </LoaderWrapper>
    );
};

export default GenreStats;
