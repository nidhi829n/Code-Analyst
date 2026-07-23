const { generateContent } = require("../services/ai.service");
const Review = require("../models/review");

const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

module.exports.getReview = asyncHandler(async (req, res) => {

    const { code, language } = req.body;

   const review = await generateContent(
    code,
    language
);

    const savedReview = await Review.create({
        user: req.user.id,
        code,
        language,
        review,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            savedReview,
            "Review generated successfully"
        )
    );

});