const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const User = require("../../models/user");

let mongod;

beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const connString = await mongod.getConnectionString();
    await mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
});

beforeEach(async () => {
    mongoose.connection.dropCollection("users");

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
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

test("Get a specified User successfully", async () => {
    const fromDb = await mongoose.connection.db.collection("users").find({ spotifyUserId: "Dinith123" });

    expect(fromDb).toBeTruthy();
});

test("Create and get a second specified User successfully", async () => {
    const newUser = new User({
        spotifyUserId: "Hong456",
        displayName: "Hong",
        profilePic: "image2.png",
        friends: ["Dinith"],
        notification: null,
        isPrivate: true,
        accessToken: "def456",
        refreshToken: "ghi987",
    });

    await newUser.save();

    const fromDb = await User.find({ spotifyUserId: "Hong456" });

    expect(fromDb.length).toBe(1);
    expect(fromDb[0].displayName).toBe("Hong");
    expect(fromDb[0].profilePic).toBe("image2.png");
    expect(fromDb[0].friends).toEqual(expect.arrayContaining(["Dinith"]));
    expect(fromDb[0].notification).toBe(null);
    expect(fromDb[0].isPrivate).toBe(true);
    expect(fromDb[0].accessToken).toBe("def456");
    expect(fromDb[0].refreshToken).toBe("ghi987");
});

test("Throw an error when trying to create a User with a spotifyUserId that's not unique", async () => {
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

    await newUser.save((err) => {
        expect(err.name).toBe("ValidationError");
    });
});

