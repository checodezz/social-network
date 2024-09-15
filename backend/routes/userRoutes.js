const express = require("express");
const auth = require("../middleware/auth");
const feedController = require("../controllers/feed/feedController");
const router = express.Router();

router.get("/feed", auth, feedController);

module.exports = router
