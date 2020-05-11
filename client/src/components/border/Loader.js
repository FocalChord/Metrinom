import grey from "@material-ui/core/colors/grey";
import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
    return <Loader type="Audio" color={grey[600]} height={100} width={100} />;
};

export default Loading;
