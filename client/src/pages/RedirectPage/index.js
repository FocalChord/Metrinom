import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { CookieManager } from "../../utils/";

const RedirectPage = () => {
    const [redirect, setRedirect] = useState(false);
    const params = useParams();

    useEffect(() => {
        const { token } = params;
        CookieManager.setUserToken(token);
        setRedirect(true);
        // eslint-disable-next-line
    }, []);

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="text-center">
            <header className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-6xl">Redirect</header>
        </div>
    );
};

export default RedirectPage;
