import React from "react";
import { CardHeader, Card, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const NumberOneTrackCard = ({ track }) => {
    const history = useHistory();

    return (
        <Grid
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
                    title={"Your #1 Track"}
                    classes={{
                        title: "MuiCardHeader-title",
                    }}
                />
                <CardActionArea
                    style={{
                        outline: "none",
                    }}
                    onClick={() => history.push(`/track/${track.trackId}`)}
                >
                    <CardHeader
                        className={"MuiCardHeader-root-1"}
                        title={track.trackName}
                        classes={{
                            title: "MuiCardHeader-title",
                        }}
                    />
                    <CardHeader
                        className={"MuiCardHeader-root-2"}
                        title={track.artistName}
                        classes={{
                            title: "MuiCardHeader-title",
                        }}
                    />
                    <CardMedia className={"MuiCardContent-root"} image={track.trackImage} />
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default NumberOneTrackCard;
