const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { generateChatResponse } = require("../services/ai.service");
const ApiError = require("../utils/ApiError");
const Chat = require("../models/Chat");
const { z } = require("zod");

const chatRequestSchema = z.object({
    code: z.string().min(1, "Code is required").max(100000),
    language: z.string().min(1, "Language is required").max(50),
    review: z.object({
        summary: z.string(),
        score: z.object({
            overall: z.number().finite().min(0).max(100),
            readability: z.number().finite().min(0).max(100),
            performance: z.number().finite().min(0).max(100),
            security: z.number().finite().min(0).max(100),
            maintainability: z.number().finite().min(0).max(100),
        }).strict(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        improvedCode: z.string(),
    }).strict(),
    messages: z.array(
        z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(10000),
        }).strict()
    ).max(50),
    question: z.string().trim().min(1, "Question is required").max(4000),
}).strict();

const chatWithAI = asyncHandler(async (req, res) => {

    const validationResult = chatRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
        throw new ApiError(
            400,
            "Invalid chat request",
            validationResult.error.issues
        );
    }

    const {
        code,
        language,
        review,
        messages,
        question
    } = validationResult.data;

    const response = await generateChatResponse(
        code,
        language,
        review,
        messages,
        question
    );

    const lastMessage = messages[messages.length - 1];
    const persistedMessages = lastMessage?.role === "user" && lastMessage.content === question
        ? messages
        : [
            ...messages,
            {
                role: "user",
                content: question,
            },
        ];

    await Chat.create({
        user: new mongoose.Types.ObjectId(req.user.id),
        code,
        language,
        review,
        messages: [
            ...persistedMessages,
            {
                role: "assistant",
                content: response,
            },
        ],
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "Chat response generated successfully"
        )
    );
});

module.exports = {
    chatWithAI
};