import React, { useContext } from "react";
import { MetrinomContext } from "../context/MetrinomContext";

const LoaderWrapper = (props) => {
    const { isLoading } = useContext(MetrinomContext);
    return <React.Fragment>{!isLoading && props.children}</React.Fragment>;
};

export default LoaderWrapper;
