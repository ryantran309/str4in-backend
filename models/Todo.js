const mongoose = require("mongoose");
const moment = require("moment");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        default: moment(Date.now()).format("MM/DD/YYYY")
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspaces",
        required: true
    }
});
TodoSchema.set("timestamps", false);

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;