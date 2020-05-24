import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";

const capitalizeGenre = (genre) => {
    return genre.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
};

const muiBaseTheme = createMuiTheme();

const getTheme = (muiBaseTheme) => ({
    MuiCard: {
        root: {
            "&.MuiPostCard--02": {
                borderRadius: muiBaseTheme.spacing(2), // 16px
                transition: "0.3s",
                boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                background: "#424242",
                marginLeft: "15%",
                paddingTop: "20",
                overflow: "initial",
                maxWidth: 420,
                padding: `${muiBaseTheme.spacing(2)}px 0`,
                "&:hover": {
                    transform: "translateY(-7px)",
                    boxShadow: "0 4px 20px 0 #1DB954",
                    color: "#1DB954",
                },

                "& .MuiCardMedia-root": {
                    flexShrink: 0,
                    width: "55%",
                    height: "55%",
                    paddingTop: "55%",
                    transform: "translateX(-24%)",
                    borderRadius: muiBaseTheme.spacing(2), // 16
                    overflow: "hidden",
                },
                "& .MuiCardContent-root": {
                    textAlign: "left",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap",
                    overflow: "hidden",
                    paddingLeft: 0,
                    padding: muiBaseTheme.spacing(2),
                },
                "& .MuiTypography--heading": {
                    color: "white",
                    "white-space": "initial",
                },
                "& .MuiTypography--subheading": {
                    marginBottom: muiBaseTheme.spacing(2),
                    color: "grey",
                    "white-space": "initial",
                },
                "& .MuiTypography--indexNumb": {
                    marginBottom: muiBaseTheme.spacing(2),
                    color: "white",
                    display: "flex",
                    "justify-content": "flex-end",
                    position: "absolute",
                },
                "& .MuiCardContent--actionarea": {
                    display: "flex",
                    "justify-content": "flex-start",
                    outline: "none",
                },
            },
        },
    },
});

const ArtistCard = ({ artistId, artistImage, artistName, genre, idx }) => {
    const history = useHistory();

    return (
        <Grid onClick={() => history.push(`/artist/${artistId}`)} item key={artistId} xs={12} sm={6} md={4}>
            <MuiThemeProvider
                theme={createMuiTheme({
                    typography: {
                        useNextVariants: true,
                    },
                    overrides: getTheme(muiBaseTheme),
                })}
            >
                <Card className={"MuiPostCard--02"}>
                    <CardActionArea className={"MuiCardContent--actionarea"}>
                        <CardMedia className={"MuiCardMedia-root"} image={artistImage} />
                        <CardContent className={"MuiCardContent-root"}>
                            <Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
                                {artistName}
                            </Typography>
                            <Typography className={"MuiTypography--subheading"}>{capitalizeGenre(capitalizeGenre(genre))}</Typography>
                            <Typography className={"MuiTypography--indexNumb"}>#{idx + 1}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </MuiThemeProvider>
        </Grid>
    );
};

export default ArtistCard;
