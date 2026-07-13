const logger = require("../config/logger");
/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
});

    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};

module.exports = errorHandler;