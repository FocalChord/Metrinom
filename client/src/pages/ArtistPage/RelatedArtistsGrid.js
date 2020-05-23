import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
    },
    gridList: {
        height: "auto",
    },
    stat: {
        fontWeight: "bold",
        textAlign: "center",
    },
    image: {
        "&:hover": {
            opacity: 0.5,
            cursor: "pointer",
        },
    },
    tile: {
        maxHeight: "25vh",
        maxWidth: "25vh",
    },
}));

const RelatedArtistsGrid = ({ data }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <Typography style={{ marginBottom: 10 }} variant="h5" className={classes.stat}>
                Related Artists
            </Typography>
            <GridList cellHeight={200} className={classes.gridList} cols={4} spacing={0}>
                {data.map((tile, idx) => (
                    <GridListTile
                        className={classes.tile}
                        height={tile.images[0].height}
                        key={idx}
                        onClick={() => history.push(`/artist/${tile.id}`)}
                    >
                        <img alt={tile.name} id={idx} className={classes.image} src={tile.images[0].url} />
                        <GridListTileBar id={idx} title={tile.name} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};

export default RelatedArtistsGrid;
