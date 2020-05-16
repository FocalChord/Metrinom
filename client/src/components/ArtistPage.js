import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MetrinomContext } from "../context/MetrinomContext";
import SpotifyClient from "../utils/SpotifyClient";
import RelatedArtistsGrid from "./RelatedArtistsGrid";
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
        marginLeft: theme.spacing(4),
    },
    avatar: {
        margin: "auto",
        width: 320,
        height: 320,
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
    title: {
        color: theme.palette.primary.light,
    },
    artists: {
        marginTop: "30px",
    },
}));

const ArtistPage = ({ history }) => {
    const classes = useStyles();
    const { setIsLoading } = useContext(MetrinomContext);
    const { artistId } = useParams();
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
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        Promise.all([
            SpotifyClient.getArtist(artistId),
            SpotifyClient.getRelatedArtist(artistId),
            SpotifyClient.checkFollowing(artistId),
        ]).then((values) => {
            const [artistRes, relatedArtistsRes, followingRes] = values;
            setArtist(artistRes);
            setRelatedArtists(relatedArtistsRes.artists);
            setIsFollowing(followingRes[0]);
            setIsLoading(false);
        });
    }, [artistId]);

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
                    <Grid item>{artist.images.length > 0 && <Avatar src={artist.images[1].url} className={classes.avatar} />}</Grid>
                    <Grid item>
                        <Typography variant="h3" gutterBottom className={classes.name}>
                            {artist.name}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item xs={4} row={2}>
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
                        </Grid>
                    </Grid>

                    <Grid item className={classes.artists}>
                        {relatedArtists && <RelatedArtistsGrid history={history} data={relatedArtists} />}
                    </Grid>
                </Grid>
            </div>
        </LoaderWrapper>
    );
};

export default ArtistPage;
