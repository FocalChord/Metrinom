import React from "react";

const LoginPage = () => {
    return (
        <div className="text-center">
            <header className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-6xl">
                <a href="http://localhost:3001/auth/spotify" className="hover:text-green-500">
                    Login
                </a>
            </header>
        </div>
    );
};

export default LoginPage;
