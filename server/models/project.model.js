const mongoose = require("mongoose");

// schema for project
const ProjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
