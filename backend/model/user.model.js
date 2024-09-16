const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        required: true
    },
    lastname: {
        type: String,
        default: null,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://placehold.co/70x70?text=Profile"
    },
    bio: {
        type: String,
        defult: "Add a bio"
    },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    token: {
        type: String,
        default: null
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema)
module.exports = User;



