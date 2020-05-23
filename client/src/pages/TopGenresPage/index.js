import {
    Avatar,
    Box,
    Divider,
    Fade,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Snackbar,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ListIcon from "@material-ui/icons/List";
import PieChartIcon from "@material-ui/icons/PieChart";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useContext, useEffect, useState } from "react";
import { LoaderWrapper, MusicLoader, PlaylistCreate } from "../../components";
import { MetrinomContext } from "../../context/MetrinomContext";
import { SpotifyClient } from "../../utils";
import PieChart from "./PieChart";

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
    button: {
        marginTop: theme.spacing(0.6),
        borderColor: "#1DB954",
        "&:hover": { transform: "scale(1.05, 1.05)" },
    },
    container: {
        height: "100%",
    },
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
    checkIcon: {
        borderRadius: 0,
        width: 65,
        height: 65,
        color: "#1DB954",
    },
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
            selected: false,
        };
    });
};

const GenreStats = () => {
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);
    const [view, setView] = useState("pie");
    const [internalLoading, setInternalLoading] = useState(false);
    const [snackbar, setSnackbar] = useState(false);

    useEffect(() => {
        if (genres.length === 0) {
            SpotifyClient.getTopGenres().then((resp) => {
                setGenres(mapGenres(resp));
                setIsLoading(false);
                setInternalLoading(false);
            });
        } else {
            setIsLoading(false);
            setInternalLoading(false);
        }
        // eslint-disable-next-line
    }, [view, genres]);

    const handleChange = (_, newValue) => {
        setInternalLoading(true);
        setView(newValue);
    };

    const selectGenre = (rank) => {
        const copy = [...genres];
        const alreadySelected = copy.filter((g) => g.selected).map((g) => g.rank);

        if (alreadySelected.includes(rank)) {
            copy[rank].selected = false;
            setGenres(copy);
        } else if (alreadySelected.length < 5) {
            copy[rank].selected = true;
            setGenres(copy);
        } else if (alreadySelected.length === 5) {
            setSnackbar(true);
        }
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
                            <Tab className={classes.hoverTab} icon={<PieChartIcon />} value="pie"></Tab>
                            <Tab className={classes.hoverTab} icon={<ListIcon />} value="list"></Tab>
                        </Tabs>
                    </Grid>
                </Box>

                {internalLoading && <MusicLoader internal={true} />}

                {!internalLoading && (
                    <div>
                        {genres ? (
                            <div>
                                {view === "pie" ? (
                                    <div style={{ height: 1000 }}>
                                        <PieChart data={mapDataToPieChart(genres)} />
                                    </div>
                                ) : (
                                    <List>
                                        {genres.map((g) => (
                                            <Box key={g.rank}>
                                                <ListItem button onClick={() => selectGenre(g.rank)}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            style={{
                                                                borderRadius: 0,
                                                                width: 65,
                                                                height: 65,
                                                                color: "#1DB954",
                                                                backgroundColor: "rgba(0, 0, 0, 0)",
                                                            }}
                                                        >
                                                            {g.rank + 1}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        style={{ paddingLeft: 20 }}
                                                        primary={g.nameUppercase}
                                                        secondary={
                                                            <React.Fragment>
                                                                {g.number} Artist{g.number > 1 ? "s" : ""}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                    {g.selected && <CheckIcon className={classes.checkIcon} />}
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

            {!internalLoading && view === "list" && (
                <PlaylistCreate
                    disabled={genres.filter((g) => g.selected).length === 0}
                    from="genres"
                    data={genres.filter((g) => g.selected)}
                />
            )}

            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={snackbar}
                autoHideDuration={3500}
                // className={classes.snackbar}
                TransitionComponent={Fade}
                onClose={() => setSnackbar(false)}
            >
                <MuiAlert elevation={6} variant="filled" severity="error">
                    A maximum of 5 Genres can be selected
                </MuiAlert>
            </Snackbar>
        </LoaderWrapper>
    );
};

export default GenreStats;
