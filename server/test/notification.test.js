const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../models/user");
const Notification = require("../models/notification");
const Shareable = require("../models/shareable");

require("dotenv").config();

const newUser = new User({
    spotifyUserId: "Dinith123",
    displayName: "Dinith",
    profilePic: "image.png",
    friends: ["Hong"],
    notification: null,
    isPrivate: true,
});

const newShareable = new Shareable({
    type: "ARTIST",
    spotifyId: "DRAKE",
});
const shareableId = newShareable._id;

const newNotification = new Notification({
    fromUser: newUser.spotifyUserId,
    shareable: newShareable,
});
const notificationId = newNotification._id;

const userWithNotification = new User({
    spotifyUserId: "HongisCool",
    displayName: "Hong Shi",
    profilePic: "image.png",
    friends: ["Dinith"],
    notification: [newNotification],
    isPrivate: true,
});
describe("Notification Model Test", () => {
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
        const savedUser = await newUser.save();
        assert(savedUser.spotifyUserId === "Dinith123");
    });
    it("creates shareable and saves successfully.", async () => {
        const savedShareable = await newShareable.save();
        assert(savedShareable.type === "ARTIST");
    });
    it("creates notification and saves successfully", async () => {
        const savedNotification = await newNotification.save();
        assert(savedNotification._id === notificationId);
    });
    it("creates user that has a notification and saves successfully.", async () => {
        const savedUserWithNotification = await userWithNotification.save();
        assert(savedUserWithNotification.notification[0]._id === notificationId);
    });

    it("gets Notification information and checks shareable and users exist in the database from the notification object", async () => {
        const notificationInfo = await Notification.find({ _id: notificationId });
        // Checks that the user that the notification is from exists
        const user = await User.find({ spotifyUserId: notificationInfo[0].fromUser });
        assert(user[0].spotifyUserId === "Dinith123");
        // Checks the shareable entitiy that relates to the notification exists
        const shareable = await Shareable.find({ _id: notificationInfo[0].shareable });
        assert.ok(shareable[0]._id.equals(shareableId));
    });

    it("gets Notification information from user object and checks that the notification exists", async () => {
        const userInfo = await User.find({ spotifyUserId: "HongisCool" });
        const notification = await Notification.find({ _id: userInfo[0].notification[0] });
        assert.ok(notification[0]._id.equals(notificationId));
    });

    it("Create notification with a missing field should result in error", async () => {
        const missingFieldNotification = new Notification({
            shareable: newShareable,
        });
        const error = missingFieldNotification.validateSync();
        assert.equal(error.errors.fromUser.message, "Path `fromUser` is required.");
    });

    it("Deletes notification from the database", async () => {
        await Notification.deleteOne({ _id: notificationId });
        const notification = await Notification.find({ _id: notificationId });
        assert(notification[0] === undefined);
    });
});
