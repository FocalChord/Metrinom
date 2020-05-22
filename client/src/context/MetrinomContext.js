import React, { createContext, useState } from "react";

export const MetrinomContext = createContext();

/**
 * Used for easy checking if a component is being loaded or not
 */
export const MetrinomProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <MetrinomContext.Provider
            value={{
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </MetrinomContext.Provider>
    );
};
