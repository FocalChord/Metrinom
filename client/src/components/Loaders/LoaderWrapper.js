import React, { useContext } from "react";
import { MetrinomContext } from "../../context/MetrinomContext";

const LoaderWrapper = ({ children }) => {
    const { isLoading } = useContext(MetrinomContext);
    return <React.Fragment>{!isLoading && children}</React.Fragment>;
};

export default LoaderWrapper;
