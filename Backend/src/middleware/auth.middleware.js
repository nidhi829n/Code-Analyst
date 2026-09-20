const jwt = require("jsonwebtoken");

const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");

module.exports = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        throw new ApiError(
            401,
            "Unauthorized"
        );
    }

    let decoded;

    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(
                401,
                "Invalid or expired token"
            );
        }

        throw error;
    }

    req.user = decoded;

    next();

});
