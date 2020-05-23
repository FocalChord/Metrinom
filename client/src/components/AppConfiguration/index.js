import React from "react";
import { CssBaseline } from "@material-ui/core";
import { LastLocationProvider } from "react-router-last-location";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { MetrinomProvider } from "../../context/MetrinomContext";

const darkTheme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: "dark",
        },
    }),
);

/**
 * Wrapper Component to wrap all the different configurations
 * the main App Component uses.
 *
 * These configurations are
 *  - ThemeProvider (Material UI Context which gives the color of the overall look and feel)
 *  - React Router
 *  - MetrinomProvider (Handles Loading of the Page)
 *  - Last Location Provider (Handles getting the last location url we were on)
 */

const AppConfiguration = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MetrinomProvider>
                <Router>
                    <LastLocationProvider>{children}</LastLocationProvider>
                </Router>
            </MetrinomProvider>
        </ThemeProvider>
    );
};

export default AppConfiguration;
