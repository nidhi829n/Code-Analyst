const express = require("express");

const aiController = require("../controllers/ai.controller");

const authMiddleware = require(
  "../middleware/auth.middleware"
);
const validate = require("../middleware/validate");
const { reviewSchema } = require("../validators/ai.validator");
const {
    aiLimiter,
} = require("../middleware/rateLimit.middleware");
const router = express.Router();

router.post(
    "/get-review",
    authMiddleware,
    aiLimiter,
    validate(reviewSchema),
    aiController.getReview
);

module.exports = router;