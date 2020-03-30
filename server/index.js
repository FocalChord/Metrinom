const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const user = require("./src/routing/user-routing");
require("dotenv").config();

const connectionString = process.env.DEV_DB_CONN || "mongodb://localhost/Metrinome";
// Connect to Mongoose
mongoose.connect(connectionString, { useNewUrlParser: true });
const db = mongoose.connection;

// Checking for DB connection
db.once("open", () => {
    console.log("Connected to MongoDB.");
});
db.on("error", () => {});

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/user", user);
// Set swagger options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Metrinom API",
            description: "Documentation for the APIs Metrinom uses",
            contact: {
                name: "YEYA",
            },
            servers: ["http://localhost:3001"],
        },
    },
    apis: ["./src/routing/*.js", "./src/models/user.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => console.log(`Server running on port ${port}`));
