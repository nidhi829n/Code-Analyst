const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { generateChatResponse } = require("../services/ai.service");
const ApiError = require("../utils/ApiError");

const chatWithAI = asyncHandler(async (req, res) => {

    const {
        code,
        language,
        review,
        messages = [],
        question
    } = req.body;

    if (!question) {
    throw new ApiError(400, "Question is required");
}

    const response = await generateChatResponse(
        code,
        language,
        review,
        messages,
        question
    );

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