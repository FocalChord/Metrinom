const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();
require("./passport/passport")(app);

const connectionString = process.env.DEV_DB_CONN || "mongodb://localhost/Metrinome";
// Connect to Mongoose
mongoose.connect(connectionString, { useNewUrlParser: true });
const db = mongoose.connection;

// Checking for DB connection
db.once("open", () => {
    console.log("Connected to MongoDB.");
});
db.on("error", () => {});

app.use(require("./src/routes"));

app.listen(port, () => console.log(`Server running on port ${port}`));
