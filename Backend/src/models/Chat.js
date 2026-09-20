const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });

const reviewSummarySchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
    },
    score: {
        overall: { type: Number, required: true },
        readability: { type: Number, required: true },
        performance: { type: Number, required: true },
        security: { type: Number, required: true },
        maintainability: { type: Number, required: true },
    },
    strengths: [{ type: String, required: true }],
    weaknesses: [{ type: String, required: true }],
    improvedCode: {
        type: String,
        required: true,
    },
}, { _id: false });

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    review: {
        type: reviewSummarySchema,
        required: true,
    },
    messages: {
        type: [chatMessageSchema],
        required: true,
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "Chat messages are required",
        },
    },
}, {
    timestamps: true,
});

chatSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Chat", chatSchema);
