import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useStyles = makeStyles(() => ({
    internalLoader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
    },
}));

const MusicLoader = ({ internal }) => {
    const classes = useStyles();
    return (
        <div className={internal && classes.internalLoader}>
            <Loader type="Audio" color={grey[600]} height={100} width={100} />{" "}
        </div>
    );
};

export default MusicLoader;
