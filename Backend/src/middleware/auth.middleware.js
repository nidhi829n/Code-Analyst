const jwt = require("jsonwebtoken");

const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");

module.exports = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ApiError(
            401,
            "Unauthorized"
        );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(
            401,
            "Token not found"
        );
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

});