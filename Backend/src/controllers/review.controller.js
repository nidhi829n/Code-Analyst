const mongoose = require("mongoose");
const Review = require("../models/review");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");


module.exports.getAllReviews = asyncHandler(async (req, res) => {

    const MAX_REVIEWS_PER_PAGE = 50;
    const requestedPage = Number(req.query.page);
    const requestedLimit = Number(req.query.limit);

    const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
        ? Math.min(requestedLimit, MAX_REVIEWS_PER_PAGE)
        : 10;

    const totalReviews = await Review.countDocuments({
        user: req.user.id,
    });

    const totalPages = Math.max(1, Math.ceil(totalReviews / limit));
    const safePage = Math.min(page, totalPages);

    const reviews = await Review.find({
        user: req.user.id,
    }).sort({
        createdAt: -1,
    }).skip((safePage - 1) * limit).limit(limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                reviews,
                page: safePage,
                limit,
                totalReviews,
                totalPages,
            },
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

    const [stats] = await Review.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $group: {
                _id: "$language",
                reviewCount: {
                    $sum: 1,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalReviews: {
                    $sum: "$reviewCount",
                },
                languagesUsed: {
                    $sum: 1,
                },
            },
        },
    ]);

    const totalReviews = stats?.totalReviews || 0;
    const languagesUsed = stats?.languagesUsed || 0;

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