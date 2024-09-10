require("dotenv").config();

const express = require("express");
const connectDB = require("./database/db");
connectDB()

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Server is Working.</h1>")
})
module.exports = app