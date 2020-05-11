import { Box, Container, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import LoaderWrapper from "../LoaderWrapper";
import PieChart from "./PieChart";
import TableRow from "./TableRow";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100%",
    },
    list: {
        width: "100%",
    },
    header: {
        marginBottom: theme.spacing(1),
    },
    title: {
        fontWeight: "bold",
    },
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

const mapDataToPieChart = (genres) => {
    const randColor = () => `hsl(${Math.round(Math.random() * 360)}, 70%, 50%)`;
    return genres.slice(0, 10).map((genre) => ({
        id: genre[0],
        label: genre[0],
        value: genre[1],
        color: randColor(),
    }));
};

const GenreStats = () => {
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        SpotifyClient.getTopGenres().then((r) => {
            setGenres(r.genres);
            setIsLoading(false);
        });
    }, []);

    return (
        <LoaderWrapper>
            <Container>
                <div className="text-center">
                    <Box className={classes.header}>
                        <Typography variant="h4" gutterBottom className={classes.title}>
                            Your Top Genres
                        </Typography>
                    </Box>

                    <div style={{ height: 1000 }}>
                        <PieChart data={mapDataToPieChart(genres)} />
                    </div>

                    <List>
                        {genres ? (
                            genres.map((x, i) => <TableRow key={i} id={i} name={x[0]} number={x[1]} />)
                        ) : (
                            <li>No Genre data available</li>
                        )}
                    </List>
                </div>
            </Container>
        </LoaderWrapper>
    );
};

export default GenreStats;
