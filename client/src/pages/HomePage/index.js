import React, { useContext, useEffect } from "react";
import { LoaderWrapper } from "../../components";
import { MetrinomContext } from "../../context/MetrinomContext";

const HomePage = () => {
    const { setIsLoading } = useContext(MetrinomContext);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        // eslint-disable-next-line
    }, []);

    return (
        <LoaderWrapper>
            <div className="text-center">
                <header className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-6xl">
                    <ul>
                        <li>Home Page</li>
                        <li>Show overview here</li>
                        <li>Show info here</li>
                        <li className="text-green-500">:)</li>
                    </ul>
                </header>
            </div>
        </LoaderWrapper>
    );
};

export default HomePage;
