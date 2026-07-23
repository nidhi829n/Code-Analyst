const express = require("express");
const { chatWithAI } = require("../controllers/chat.controller");
const verifyJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", verifyJWT, chatWithAI);

module.exports = router;