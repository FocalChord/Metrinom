require("dotenv").config();

const mongoose = require("mongoose");
const connectionString = process.env.DEV_DB_CONN || "mongodb://localhost/Metrinome";

const connectToMongoose = async () => {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.once("open", () => {
        console.log("Connected to MongoDB.");
    });

    db.on("error", () => {
        console.log("error");
    });
};

module.exports = connectToMongoose;
