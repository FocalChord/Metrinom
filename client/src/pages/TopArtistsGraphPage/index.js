import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { LoaderWrapper } from "../../components";
import { MetrinomContext } from "../../context/MetrinomContext";
import { SpotifyClient } from "../../utils";

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(1),
    },
    title: {
        fontWeight: "bold",
    },
    sliderRoot: {
        width: 300,
    },
    bottomHeader: {
        marginTop: "12px",
        marginBottom: theme.spacing(1),
    },
}));

const options = {
    layout: {
        randomSeed: 482002,
        hierarchical: false,
        improvedLayout: true,
    },
    edges: {
        color: { color: "#1DB954", highlight: "white" },
        arrows: {
            to: false,
            from: false,
        },
        length: 500,
    },
    height: "900px",
    interaction: { dragView: true, zoomView: true },
    nodes: {
        shape: "circularImage",
        font: {
            size: 14,
            color: "#ffffff",
        },
        borderWidth: 3,
        borderWidthSelected: 3,
        color: {
            background: "#d7d7f3",
            border: "transparent",
            highlight: {
                border: "#1DB954",
            },
        },
    },
};

const TopArtistsGraphPage = () => {
    const classes = useStyles();

    const { isLoading, setIsLoading } = useContext(MetrinomContext);
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    useEffect(() => {
        let isMounted = true;

        SpotifyClient.getArtistGraph().then((res) => {
            if (!isMounted) return;
            setGraph({
                nodes: res.nodes.slice(0, 30),
                edges: res.edges,
            });
            setIsLoading(false);
        });

        return () => {
            isMounted = false;
        };

        // eslint-disable-next-line
    }, []);

    return (
        <LoaderWrapper>
            <Box className={classes.header}>
                <Grid container direction="row" alignItems="flex-start" justify="space-between">
                    <Grid item>
                        <Typography variant="h4" gutterBottom className={classes.title}>
                            Artist Graph
                        </Typography>
                        <Typography subtitle2="title" gutterBottom>
                            View which of your top artists are related to your other top artists!
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <div style={{ outline: "none" }} className="text-center">
                {!isLoading && <Graph style={{ outline: "none" }} graph={graph} options={options} />}
            </div>
            <Box className={classes.bottomHeader}>
                <div className="mt-10">
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item>
                            <Typography subtitle2="title" gutterBottom>
                                Note: zooming into browser will make the graph unresponsive
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </LoaderWrapper>
    );
};

export default TopArtistsGraphPage;
