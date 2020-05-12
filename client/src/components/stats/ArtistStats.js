import React, { useContext, useEffect, useState } from "react";
import { Card, Box, CardMedia, CardContent, Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { MetrinomContext } from "../../context/MetrinomContext";
import SpotifyClient from "../../utils/SpotifyClient";
import LoaderWrapper from "../LoaderWrapper";

const ArtistStats = () => {
    const [artists, setArtists] = useState([]);
    const { setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        SpotifyClient.getTopArtists().then((r) => {
            setArtists(r.items);
            console.log(r.items);
            setIsLoading(false);
        });
    }, []);
    const theme = createMuiTheme({
        palette: {
            primary: purple,
            secondary: green,
        },
        status: {
            danger: "orange",
        },
    });
    return (
        <LoaderWrapper>
            <div className="text-center">
                <h1>Your top Artists are</h1>
                <ul>
                    {artists ? (
                        artists.map((artist, idx) => (
                            <Box key={artist.trackId}>
                                <MuiThemeProvider
                                    theme={createMuiTheme({
                                        typography: {
                                            useNextVariants: true,
                                        },
                                        overrides: theme,
                                    })}
                                >
                                    <Card className={"MuiPostCard--02"}>
                                        <CardMedia className={"MuiCardMedia-root"} image={artist.images[0].url} />
                                        <CardContent className={"MuiCardContent-root"}>
                                            <Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
                                                {artist.name}
                                            </Typography>
                                            <Typography className={"MuiTypography--subheading"}>{artist.genres[0]}</Typography>
                                            <Typography className={"MuiTypography--subheading"}>{idx + 1}</Typography>
                                        </CardContent>
                                    </Card>
                                </MuiThemeProvider>
                            </Box>
                        ))
                    ) : (
                        <li>No Artist data available :(</li>
                    )}
                </ul>
            </div>
        </LoaderWrapper>
    );
};

export default ArtistStats;
