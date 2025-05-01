const mongoose = require("mongoose");

// schema for user
const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", UserSchema);

module.exports = { User };
