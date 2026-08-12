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

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

});
