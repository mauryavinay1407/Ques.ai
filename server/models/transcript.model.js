const mongoose = require("mongoose");

// schema for transcript
const TranscriptSchema = mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileDescription: {
            type: String,
        },
        status: {
            type: String,
            default: "done",
        },
    },
    {
        timestamps: true,
    }
);

const Transcript = mongoose.model("transcripts", TranscriptSchema);

module.exports = { Transcript };
