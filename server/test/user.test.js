const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../models/user");

require("dotenv").config();

describe("Data Model Test", () => {
    before(async () => {
        await mongoose.connect(process.env.TEST_DB_CONN, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.err(err);
            }
        });
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("creates user and saves successfully.", async () => {
        const newUser = new User({
            spotifyUserId: "Dinith123",
            displayName: "Dinith",
            profilePic: "image.png",
            friends: ["Hong"],
            notification: null,
            isPrivate: true,
        });
        const savedUser = await newUser.save();
        assert(savedUser.spotifyUserId === "Dinith123");
    });

    it("gets user information", async () => {
        const userinfo = await User.find({ spotifyUserId: "Dinith123" });
        assert(userinfo[0].spotifyUserId === "Dinith123");
        assert(userinfo[0].displayName === "Dinith");
        assert(userinfo[0].friends[0] === "Hong");
    });

    it("Checks for duplicate spotifyIds", async () => {
        const repeatedUser = new User({
            spotifyUserId: "Dinith123",
            displayName: "Dinith",
            profilePic: "image.png",
            friends: ["Hong"],
            notification: null,
            isPrivate: true,
        });
        await repeatedUser.save(function (err) {
            assert(err.name === "ValidationError");
        });
    });

    it("Create object with a missing field should result in error", async () => {
        const missingFieldUser = new User({
            displayName: "Dinith",
            profilePic: "image.png",
            friends: ["Hong"],
            notification: null,
            isPrivate: true,
        });
        const error = missingFieldUser.validateSync();
        assert.equal(error.errors.spotifyUserId.message, "Path `spotifyUserId` is required.");
    });

    it("Deletes user from the database", async () => {
        await User.deleteOne({ spotifyUserId: "Dinith123" });
        const user = await User.find({ spotifyUserId: "Dinith123" });
        assert(user[0] === undefined);
    });
});
