const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const User = require("../../models/user");

let mongod;

beforeAll(async () => {
    mongod = new MongoMemoryServer();

    const connString = await mongod.getConnectionString();
    await mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

test("Create a collection called 'user' and save a User to it successfully", async () => {
    const newUser = new User({
        spotifyUserId: "Dinith123",
        displayName: "Dinith",
        profilePic: "image.png",
        friends: ["Hong"],
        notification: null,
        isPrivate: true,
        accessToken: "abc123",
        refreshToken: "xyz789",
    });

    await newUser.save();

    const fromDb = await mongoose.connection.db.collection("users").find({ _id: newUser._id });

    expect(fromDb).toBeTruthy();
});
