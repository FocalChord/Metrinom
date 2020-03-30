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
 *            type: string
 *            description: display name for spotify
 *          viewed:
 *            type: boolean
 *            description: if the notification has been viewed or not
 *        example:
 *           User:
 *           shareable:
 *           viewed: false
 */
const notificationSchema = mongoose.Schema({
    fromUser: {
        type: String,
        required: true,
    },
    shareable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    viewed: {
        type: Boolean,
        required: true,
        default: false,
    },
});
notificationSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Notification", notificationSchema);
