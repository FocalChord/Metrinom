const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const shareableSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["SONG", "ARTIST", "PLAYLIST"],
        required: true,
    },
    spotifyId: {
        type: String,
        required: true,
    },
});
shareableSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Shareable", shareableSchema);
