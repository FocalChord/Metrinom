const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - spotifyUserId
 *          - displayName
 *          - friends
 *          - isPrivate
 *        properties:
 *          spotifyUserId:
 *            type: string
 *            description: User id that spotify generates
 *          displayName:
 *            type: string
 *            description: display name for spotify
 *          profilePic:
 *            type: string
 *            description: link to image of profile picture
 *          notification:
 *            type: Notification[]
 *            description: list of notifications
 *          friends:
 *            type: string[]
 *            description: list of spotifyUserIds
 *          isPrivate:
 *            type: boolean
 *            description: if the user wants to show there profile information
 *        example:
 *           spotifyUserId: 390FGD84JD
 *           displayName: Dinitj
 *           profilePic: image.png
 *           friends: [Hong, Nisarag]
 *           notification: []
 *           isPrivate: false
 */
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
module.exports = mongoose.model("User", userSchema);
