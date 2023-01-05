const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    todo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todos",
        required: true
    },
    is_seen: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});
NotificationSchema.set("timestamps", false);

const NotificationModel = mongoose.model("Notification", NotificationSchema);
module.exports = NotificationModel;