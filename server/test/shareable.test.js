const mongoose = require("mongoose");
const assert = require("assert");
const Shareable = require("../src/models/shareable");

require("dotenv").config();

describe("Shareable Model Test", () => {
    let shareableId;
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
    it("creates shareable and saves successfully.", async () => {
        const newShareable = new Shareable({
            type: "ARTIST",
            spotifyId: "DRAKE",
        });
        shareableId = newShareable.id;
        const savedShareable = await newShareable.save();
        assert(savedShareable.type === "ARTIST");
        assert(savedShareable.spotifyId === "DRAKE");
    });

    it("gets shareable information", async () => {
        const shareableInfo = await Shareable.find({ _id: shareableId });
        assert(shareableInfo[0].type === "ARTIST");
        assert(shareableInfo[0].spotifyId === "DRAKE");
    });

    it("Create shareable with a missing field should result in error", async () => {
        const missingFieldShareable = new Shareable({
            spotifyId: "DRAKE",
        });
        const error = missingFieldShareable.validateSync();
        assert.equal(error.errors.type.message, "Path `type` is required.");
    });

    it("Deletes shareable from the database", async () => {
        await Shareable.deleteOne({ _id: shareableId });
        const shareable = await Shareable.find({ _id: shareableId });
        assert(shareable[0] === undefined);
    });
});
