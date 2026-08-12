const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middleware/validate");
const {
    signupSchema,
    loginSchema,
} = require("../validators/auth.validator");
const {
    loginLimiter,
    signupLimiter,
} = require("../middleware/rateLimit.middleware");

router.post(
    "/signup",
    signupLimiter,
    validate(signupSchema),
    authController.signup
);

router.post(
    "/login",
    loginLimiter,
    validate(loginSchema),
    authController.login
);

router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

module.exports = router;