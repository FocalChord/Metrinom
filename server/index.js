const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const passportSetup = require("./config/passport-setup");
const authRoutes = require("./src/routes/auth");
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
app.use(passport.initialize());
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: ["3125125125125"],
    }),
);

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Hello Worldsss");
});
// app.get("/api/users", (req, res) => {
//     res.send;
// });
app.listen(port, () => console.log(`Server running on port ${port}`));
