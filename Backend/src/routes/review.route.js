const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, reviewController.getAllReviews);
router.get("/stats", authMiddleware, reviewController.getStats);
router.get("/:id", authMiddleware, reviewController.getReviewById);
router.delete("/:id", authMiddleware, reviewController.deleteReview);


module.exports = router;