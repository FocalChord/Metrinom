const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema({
    spotifyUserId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
    },
    friends: {
        type: [String],
        required: true,
        default: null,
    },
    notification: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        default: null,
    },
    isPrivate: {
        type: Boolean,
        require: true,
        default: false,
    },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
