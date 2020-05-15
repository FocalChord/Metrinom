import React, { useState, useEffect, useContext } from "react";
import { Typography, Avatar, Grid, Button, CardActionArea, CardContent, CardMedia, Card, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

import SpotifyClient from "../utils/SpotifyClient";
import { useParams } from "react-router-dom";
import { MetrinomContext } from "../context/MetrinomContext";
import LoaderWrapper from "./LoaderWrapper";
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
    },
    name: {
        marginTop: theme.spacing(4),
        fontWeight: "bold",
    },
    followingBtn: {
        marginTop: theme.spacing(4),
    },
    avatar: {
        margin: "auto",
        width: 320,
        height: 320,
        [theme.breakpoints.down("sm")]: {
            width: 180,
            height: 180,
        },
    },
    stat: {
        fontWeight: "bold",
        textAlign: "center",
    },
    statTitle: {
        color: grey[500],
        textAlign: "center",
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },

    gridList: {
        flexWrap: "nowrap",
        maxWidth: "120",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)",
    },
    title: {
        color: theme.palette.primary.light,
    },

    cardMedia: {
        height: 150,
        width: 150,
    },
}));

const ArtistPage = () => {
    const { setIsLoading } = useContext(MetrinomContext);
    const params = useParams();
    const { artistId } = params;
    const [artist, setArtist] = useState({
        name: "",
        followers: {
            total: 0,
        },
        genres: [],
        popularity: 0,
        images: [],
        id: "",
    });
    const [relatedArtists, setRelatedArtists] = useState([]);
    const classes = useStyles();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        SpotifyClient.getArtist(artistId).then((r) => {
            setArtist(r);
        });
        SpotifyClient.getRelatedArtist(artistId).then((r) => {
            setRelatedArtists(r.artists);
        });
        SpotifyClient.checkFollowing(artistId).then((r) => {
            console.log(r);
            setIsFollowing(r[0]);
            setIsLoading(false);
        });
    }, []);

    const toggleFollow = async () => {
        try {
            if (!isFollowing) {
                setIsFollowing(true);
                await SpotifyClient.followArtist(artistId);
            } else {
                setIsFollowing(false);
                await SpotifyClient.unfollowArtist(artistId);
            }
        } catch (e) {
            setIsFollowing(isFollowing);
        }
    };

    return (
        <LoaderWrapper>
            <div className="text-center">
                <Grid container spacing={1} direction="column" alignItems="center" justify="center" style={{ minHeight: "80vh" }}>
                    <Grid item>
                        {artist.images.length > 0 && <Avatar alt="Remy Sharp" src={artist.images[1].url} className={classes.avatar} />}
                    </Grid>
                    <Grid item>
                        <Typography variant="h3" gutterBottom className={classes.name}>
                            {artist.name}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="h5" className={classes.stat}>
                                    {artist.followers.total.toLocaleString()}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.statTitle}>
                                    Followers
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" size="large" className={classes.followingBtn} onClick={toggleFollow}>
                                    {isFollowing ? "Following" : "Follow"}
                                </Button>
                            </Grid>
                            <Grid container spacing={2}>
                                <Typography variant="h5" className={classes.stat}>
                                    Related Artists
                                </Typography>
                                <GridList className={classes.gridList} cols={20}>
                                    {relatedArtists ? (
                                        relatedArtists.map((artist) => (
                                            <GridListTile key={artist.id}>
                                                <Card className={classes.card}>
                                                    <CardActionArea className={classes.cardMedia}>
                                                        <CardMedia
                                                            image={artist.images[1].url}
                                                            className={classes.cardMedia}
                                                            title={artist.name}
                                                        />
                                                        <CardContent className={classes.cardContent}>
                                                            <Typography variant="subtitle1" className={classes.artistName}>
                                                                {artist.name}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </GridListTile>
                                        ))
                                    ) : (
                                        <li>No related Artist data available :(</li>
                                    )}
                                </GridList>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </LoaderWrapper>
    );
};

export default ArtistPage;
