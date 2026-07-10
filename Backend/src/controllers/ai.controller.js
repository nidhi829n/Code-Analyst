const generateContent = require("../services/ai.service");
const Review = require("../models/review");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

module.exports.getReview = asyncHandler(async (req, res) => {

    const { code, language } = req.body;

    if (!code) {
        throw new ApiError(
            400,
            "Code is required"
        );
    }

    const review = await generateContent(code);

    await Review.create({
        user: req.user.id,
        code,
        language,
        review,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            review,
            "Review generated successfully"
        )
    );

});