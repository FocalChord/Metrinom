const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const notificationSchema = mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    shareable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});
notificationSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Notification", notificationSchema);
