const express = require("express");
const { chatWithAI } = require("../controllers/chat.controller");
const verifyJWT = require("../middleware/auth.middleware");
const { aiLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post("/", verifyJWT, aiLimiter, chatWithAI);

module.exports = router;