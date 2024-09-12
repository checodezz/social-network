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
    token: {
        type: String,
        default: null
    },
})

module.exports = mongoose.model("User", userSchema)