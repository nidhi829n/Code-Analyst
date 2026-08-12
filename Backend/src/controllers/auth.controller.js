const crypto = require("crypto");
const User = require("../models/user");
const Session = require("../models/session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");


module.exports.signup = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists"
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const createdUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User created successfully"
        )
    );

});


module.exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            type: "refresh",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    const tokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await Session.create({
        userId: user._id,
        tokenHash,
        expiresAt,
    });

    const loggedInUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    };

    const refreshTokenCookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
        .json(
            new ApiResponse(
                200,
                loggedInUser,
                "Login successful"
            )
        );

});


module.exports.logout = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const session = await Session.findOne({ tokenHash });

        if (session && !session.revokedAt) {
            session.revokedAt = new Date();
            await session.save();
        }
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    return res
        .status(200)
        .clearCookie("token", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "Logout successful"
            )
        );

});


module.exports.refresh = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new ApiError(
            401,
            "Refresh token is missing"
        );
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch {
        throw new ApiError(
            401,
            "Invalid or expired refresh token"
        );
    }

    if (decoded.type !== "refresh") {
        throw new ApiError(
            401,
            "Invalid token type"
        );
    }

    const tokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const session = await Session.findOne({ tokenHash });

    if (!session) {
        throw new ApiError(
            401,
            "Invalid session"
        );
    }

    if (session.revokedAt) {
        logger.warn({
            event: "REFRESH_TOKEN_REUSE_DETECTED",
            userId: session.userId || decoded.id,
            message: "Revoked refresh token reuse detected. Invalidating all active sessions for user.",
        });

        await Session.updateMany(
            {
                userId: session.userId,
                revokedAt: null,
            },
            {
                $set: { revokedAt: new Date() },
            }
        );

        const clearCookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.clearCookie("token", clearCookieOptions);
        res.clearCookie("refreshToken", clearCookieOptions);

        throw new ApiError(
            401,
            "Refresh token reuse detected"
        );
    }

    if (session.expiresAt && session.expiresAt < new Date()) {
        throw new ApiError(
            401,
            "Session has expired"
        );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(
            401,
            "User not found"
        );
    }

    session.revokedAt = new Date();
    await session.save();

    const newRefreshToken = jwt.sign(
        {
            id: user._id,
            type: "refresh",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    const newRefreshTokenHash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex");

    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await Session.create({
        userId: user._id,
        tokenHash: newRefreshTokenHash,
        expiresAt: newExpiresAt,
        revokedAt: null,
    });

    const refreshTokenCookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    };

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "Access token refreshed successfully"
            )
        );

});