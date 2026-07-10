const Review = require("../models/review");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");


module.exports.getAllReviews = asyncHandler(async (req, res) => {

    const reviews = await Review.find({
        user: req.user.id,
    }).sort({
        createdAt: -1,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            reviews,
            "Reviews fetched successfully"
        )
    );

});


module.exports.getReviewById = asyncHandler(async (req, res) => {

    const review = await Review.findOne({
        _id: req.params.id,
        user: req.user.id,
    });

    if (!review) {
        throw new ApiError(
            404,
            "Review not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            review,
            "Review fetched successfully"
        )
    );

});


module.exports.deleteReview = asyncHandler(async (req, res) => {

    const review = await Review.findOne({
        _id: req.params.id,
        user: req.user.id,
    });

    if (!review) {
        throw new ApiError(
            404,
            "Review not found"
        );
    }

    await review.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Review deleted successfully"
        )
    );

});


module.exports.getStats = asyncHandler(async (req, res) => {

    const reviews = await Review.find({
        user: req.user.id,
    });

    const totalReviews = reviews.length;

    const languagesUsed = [
        ...new Set(
            reviews.map((review) => review.language)
        ),
    ].length;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalReviews,
                languagesUsed,
            },
            "Statistics fetched successfully"
        )
    );

});