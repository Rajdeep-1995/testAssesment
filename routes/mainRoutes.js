const express = require("express");
const { returnPosts } = require("../services/mainService");
const router = express.Router();

router.get("/posts", returnPosts);

module.exports = router;
