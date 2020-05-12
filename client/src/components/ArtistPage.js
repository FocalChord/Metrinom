import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MetrinomContext } from "../context/MetrinomContext";
import LoaderWrapper from "./LoaderWrapper";
const HomePage = () => {
    const { setIsLoading } = useContext(MetrinomContext);
    const params = useParams();
    const { artistId } = params;
    console.log(artistId);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <LoaderWrapper>
            <div className="text-center">
                <header className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-6xl">
                    <ul>
                        <li> Artist Page !</li>
                    </ul>
                </header>
            </div>
        </LoaderWrapper>
    );
};

export default HomePage;
