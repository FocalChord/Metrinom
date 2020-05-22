const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const User = require("../../models/user");

let mongod;

beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const connString = await mongod.getConnectionString();
    await mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection("users");

    const newUser = {
        spotifyUserId: "Dinith123",
        displayName: "Dinith",
        profilePic: "image.png",
        friends: ["Hong"],
        notification: null,
        isPrivate: true,
        accessToken: "abc123",
        refreshToken: "xyz789",
    };

    await coll.insertOne(newUser);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
});

test("Get a specified User successfully", async () => {
    const fromDb = await User.find({ spotifyUserId: "Dinith123" });

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

test("Delete user from the database", async () => {
    await User.deleteOne({ spotifyUserId: "Dinith123" });
    const dbResponse = await User.find({ spotifyUserId: "Dinith123" });

    expect(dbResponse[0]).toBe(undefined);
});

test("Throw an error when trying to create a User with a spotifyUserId that's not unique", async () => {
    const duplicateUser = new User({
        spotifyUserId: "Dinith123",
        displayName: "Dinith",
        profilePic: "image.png",
        friends: ["Hong"],
        notification: null,
        isPrivate: true,
        accessToken: "abc123",
        refreshToken: "xyz789",
    });

    await duplicateUser.save((err) => {
        if (err) {
            console.log(err);
            expect(err.name).toBe("ValidationError");
            expect(err.errors.spotifyUserId.message).toBe("Error, expected `spotifyUserId` to be unique. Value: `Dinith123`");
        } else {
            fail("Should throw an error due to non-unique spotifyUserId");
        }
    });
});
