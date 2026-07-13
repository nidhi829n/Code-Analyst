const rateLimit = require("express-rate-limit");

// Login Limiter
const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 Minutes

    max: 5,

    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes.",
    },

    standardHeaders: true,

    legacyHeaders: false,

});

// Signup Limiter
const signupLimiter = rateLimit({

    windowMs: 60 * 60 * 1000, // 1 Hour

    max: 3,

    message: {
        success: false,
        message: "Too many signup attempts. Please try again after 1 hour.",
    },

    standardHeaders: true,

    legacyHeaders: false,

});

// AI Review Limiter
const aiLimiter = rateLimit({

    windowMs: 60 * 60 * 1000, // 1 Hour

    max: 20,

    message: {
        success: false,
        message: "AI review limit exceeded. Please try again later.",
    },

    standardHeaders: true,

    legacyHeaders: false,

});

// General API Limiter
const apiLimiter = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 Minutes

    max: 100,

    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },

    standardHeaders: true,

    legacyHeaders: false,

});

module.exports = {
    loginLimiter,
    signupLimiter,
    aiLimiter,
    apiLimiter,
};