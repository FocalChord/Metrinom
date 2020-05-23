import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { LoaderWrapper, MusicLoader } from "../../components";
import { MetrinomContext } from "../../context/MetrinomContext";
import { SpotifyClient } from "../../utils";
import ArtistCard from "./ArtistCard";

const useStyles = makeStyles(() => ({
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
}));

const TopArtistsPage = () => {
    const classes = useStyles();

    const { setIsLoading } = useContext(MetrinomContext);

    const [artists, setArtists] = useState([]);
    const [timeFrame, setTimeframe] = useState("long_term");
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        SpotifyClient.getTopArtists("artists", timeFrame).then((r) => {
            if (!isMounted) return;
            setArtists(r.items);
            setIsLoading(false);
            setInternalLoading(false);
        });

        return () => {
            isMounted = false;
        };

        // eslint-disable-next-line
    }, [timeFrame]);

    const handleChange = (_, newValue) => {
        if (newValue === timeFrame) return;
        setInternalLoading(true);
        setTimeframe(newValue);
    };

    return (
        <LoaderWrapper>
            <div className="text-center">
                <Box className={classes.header}>
                    <Grid container direction="row" alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Typography variant="h4" className={classes.title}>
                                Your Top Artists
                            </Typography>
                        </Grid>
                        <Tabs
                            indicatorColor="primary"
                            color="primary"
                            value={timeFrame}
                            onChange={handleChange}
                            classes={{ indicator: classes.tabs }}
                            variant="fullWidth"
                        >
                            <Tab className={classes.hoverTab} label="All Time" value="long_term" />
                            <Tab className={classes.hoverTab} label="Last 6 months" value="medium_term" />
                            <Tab className={classes.hoverTab} label="Last 4 weeks" value="short_term" />
                        </Tabs>
                    </Grid>
                </Box>
                {internalLoading && <MusicLoader internal={true} />}
                {!internalLoading && (
                    <ul>
                        <Grid style={{ paddingTop: 30 }} container spacing={3}>
                            {artists ? (
                                artists.map((artist, idx) => (
                                    <ArtistCard
                                        key={idx}
                                        artistId={artist.id}
                                        artistImage={artist.images[0].url}
                                        artistName={artist.name}
                                        genre={artist.genres[0]}
                                        idx={idx}
                                    />
                                ))
                            ) : (
                                <li>No Artist data available :(</li>
                            )}
                        </Grid>
                    </ul>
                )}
            </div>
        </LoaderWrapper>
    );
};

export default TopArtistsPage;
