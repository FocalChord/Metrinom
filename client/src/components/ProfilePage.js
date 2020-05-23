import React, { useContext, useEffect } from "react";
import { MetrinomContext } from "../context/MetrinomContext";
import LoaderWrapper from "./LoaderWrapper";

const ProfilePage = () => {
    const { setIsLoading } = useContext(MetrinomContext);

    setIsLoading(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <LoaderWrapper>
            <div>
                <h1>PROFILE PAGE</h1>
            </div>
        </LoaderWrapper>
    );
};

export default ProfilePage;
