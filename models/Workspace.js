const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});
WorkspaceSchema.set("timestamps", false);

const WorkspaceModel = mongoose.model("workspaces", WorkspaceSchema);
module.exports = WorkspaceModel;