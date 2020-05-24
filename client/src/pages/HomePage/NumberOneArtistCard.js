import React from "react";
import { CardHeader, Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const NumberOneArtistCard = ({ artist }) => {
    const history = useHistory();
    return (
        <Grid
            item
            xs={12}
            style={{
                marginTop: 200,
            }}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Card className={"MuiElevatedCard--01"}>
                <CardHeader
                    className={"MuiCardHeader-root-3"}
                    title={"Your #1 Artist"}
                    classes={{
                        title: "MuiCardHeader-title",
                    }}
                />
                <CardActionArea
                    style={{
                        outline: "none",
                    }}
                    onClick={() => history.push(`/artist/${artist.id}`)}
                >
                    <CardHeader
                        className={"MuiCardHeader-root-1"}
                        title={artist.name}
                        classes={{
                            title: "MuiCardHeader-title",
                        }}
                    />
                    <CardHeader
                        className={"MuiCardHeader-root-2"}
                        title={artist.genres[0]}
                        classes={{
                            title: "MuiCardHeader-title",
                        }}
                    />
                    <CardMedia className={"MuiCardContent-root"} image={artist.images[0].url} />
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default NumberOneArtistCard;
