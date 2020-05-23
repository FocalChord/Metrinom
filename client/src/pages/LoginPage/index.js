import React from "react";
import { makeStyles, Container, Button, Paper } from "@material-ui/core";
import MetrinomLogo from "../../resources/MetrinomLogo.png";

const useStyles = makeStyles(() => ({
    root: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    containerItems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    paperLayout: {
        width: "60%",
        margin: "10%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
    },
    buttonLogin: {
        marginBottom: "5%",
        width: 350,
        height: 50,
        backgroundColor: "#1DB954",
        "&:hover": {
            backgroundColor: "#4AC776",
            color: "#FFF",
        },
    },
    textInput: {
        width: "75%",
    },
    title: {
        margin: "5%",
    },
}));

require("dotenv").config();

const METRINOME_BACKEND_URL = process.env.REACT_APP_URL || "http://localhost:3001";
const buttonLink = `${METRINOME_BACKEND_URL}/auth/spotify`;

const LoginPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container className={classes.containerItems}>
                <Paper elevation={3} className={classes.paperLayout}>
                    <img alt="Metrinom Logo" style={{ width: 500 }} src={MetrinomLogo} />
                    <Button href={buttonLink} className={classes.buttonLogin} variant="contained" color="primary">
                        Sign in with Spotify
                    </Button>
                </Paper>
            </Container>
        </div>
    );
};
export default LoginPage;
