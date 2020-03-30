const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
/**
 * @swagger
 *  components:
 *    schemas:
 *      Notification:
 *        type: object
 *        required:
 *          - fromUser
 *          - shareable
 *          - viewed
 *        properties:
 *          fromUser:
 *            type: String
 *            description: User object that sent the notification
 *          shareable:
 *            type: shareable
 *            description: display name for spotify
 *          viewed:
 *            type: boolean
 *            description: if the notification has been viewed or not
 *        example:
 *           fromUser: "Dinith"
 *           shareable:
 *              type: SONG
 *              spotifyId: SD89cjs2j342
 *           viewed: false
 */
const notificationSchema = mongoose.Schema({
    fromUser: {
        type: String,
        required: true,
        unique: false,
    },
    shareable: {
        type: {
            type: String,
            enum: ["SONG", "ARTIST", "PLAYLIST", "FRIEND REQUEST"],
            required: true,
        },
        spotifyId: {
            type: String,
            required: true,
        },
    },
    viewed: {
        type: Boolean,
        required: true,
        default: false,
    },
});
module.exports = mongoose.model("Notification", notificationSchema);
