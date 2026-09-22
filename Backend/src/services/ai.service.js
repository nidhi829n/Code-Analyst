const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");

const reviewResponseSchema = z.object({
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
}).strict();

const geminiReviewResponseSchema = {
    type: "OBJECT",
    properties: {
        summary: { type: "STRING" },
        score: {
            type: "OBJECT",
            properties: {
                overall: { type: "NUMBER" },
                readability: { type: "NUMBER" },
                performance: { type: "NUMBER" },
                security: { type: "NUMBER" },
                maintainability: { type: "NUMBER" },
            },
            required: [
                "overall",
                "readability",
                "performance",
                "security",
                "maintainability",
            ],
            propertyOrdering: [
                "overall",
                "readability",
                "performance",
                "security",
                "maintainability",
            ],
        },
        strengths: {
            type: "ARRAY",
            items: { type: "STRING" },
        },
        weaknesses: {
            type: "ARRAY",
            items: { type: "STRING" },
        },
        improvedCode: { type: "STRING" },
    },
    required: ["summary", "score", "strengths", "weaknesses", "improvedCode"],
    propertyOrdering: ["summary", "score", "strengths", "weaknesses", "improvedCode"],
};

const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY,
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const MAX_AI_RETRIES = 2;

function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function generateGeminiResponse(request) {
    for (let attempt = 0; attempt <= MAX_AI_RETRIES; attempt += 1) {
        try {
            return await genAI.models.generateContent(request);
        } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        let providerError = error?.error || error;

        if (typeof providerError === "string") {
            try {
                providerError = JSON.parse(providerError);
            } catch {
                providerError = { message: providerError };
            }
        }

        const errorCode = providerError?.code || error?.status;
        const errorStatus = providerError?.status || error?.statusCode;
        const errorMessage = typeof providerError?.message === "string"
            ? providerError.message
            : typeof error?.message === "string"
                ? error.message
                : "";

        const isTransientFailure =
            errorCode === 408 ||
            errorCode === 429 ||
            errorCode === 500 ||
            errorCode === 502 ||
            errorCode === 503 ||
            errorCode === 504 ||
            errorStatus === "UNAVAILABLE" ||
            /high demand|temporarily unavailable|service unavailable|timeout/i.test(errorMessage);

        if (isTransientFailure && attempt < MAX_AI_RETRIES) {
        const baseDelay = 1000 * (2 ** attempt);
        const jitter = Math.random() * 500;

        await wait(baseDelay + jitter);
        continue;
}

        logger.error({
            event: "AI_PROVIDER_REQUEST_FAILED",
            code: errorCode,
            status: errorStatus,
            reason: errorMessage.slice(0, 300),
        });

        if (errorCode === 429 || errorCode === "RESOURCE_EXHAUSTED") {
            throw new ApiError(
                429,
                "AI service quota exceeded. Please try again later."
            );
        }

        if (/quota|rate limit|resource exhausted/i.test(errorMessage)) {
            throw new ApiError(
                429,
                "AI service quota exceeded. Please try again later."
            );
        }

        if (
            errorCode === 401 ||
            errorCode === 403 ||
            /api key|authentication|permission|unauthenticated/i.test(errorMessage)
        ) {
            throw new ApiError(
                502,
                "AI service authentication is not configured correctly"
            );
        }

        if (
            errorCode === 503 ||
            errorStatus === "UNAVAILABLE" ||
            /high demand|temporarily unavailable|service unavailable/i.test(errorMessage)
        ) {
            throw new ApiError(
                503,
                "AI service is temporarily unavailable. Please try again later."
            );
        }

        if (
            errorCode === 400 ||
            /model|invalid argument|bad request/i.test(errorMessage)
        ) {
            throw new ApiError(
                502,
                "AI service configuration is invalid"
            );
        }

        throw new ApiError(
            502,
            "AI service is temporarily unavailable"
        );
        }
    }
}

async function generateContent(
    code,
    language
    
)  {
    const result = await generateGeminiResponse({
        model: GEMINI_MODEL,
        contents: [
    {
        role: "user",
        parts: [
            {
                text: `

        You are a Senior Software Engineer.

        Review the following ${language} code.

        Return ONLY valid JSON.
        The programming language is ${language}.

        Generate the improved code ONLY in the same language.

        Do not convert it into another language.

        Do NOT:
        - Explain concepts
        - Give examples
        - Write markdown
        - Write \`\`\`
        - Ask questions
        - Add any text outside JSON

        Return EXACTLY this schema:

        {
          "summary": "",
          "score": {
            "overall": 0,
            "readability": 0,
            "performance": 0,
            "security": 0,
            "maintainability": 0
          },
          "strengths": [],
          "weaknesses": [],
          "improvedCode": ""
        }

        Code to review:

${code}
                `,
            },
        ],
    },
],

        config: {
            temperature: 0.1,
            responseMimeType: "application/json",
            responseSchema: geminiReviewResponseSchema,
        },
    });

        const cleanedResponse = typeof result.text === "string"
            ? result.text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()
            : "";

    if (!cleanedResponse) {
        throw new ApiError(
            502,
            "AI returned an empty response"
        );
    }

    let parsedResponse;

    try {
        parsedResponse = JSON.parse(cleanedResponse);
    } catch {
        throw new ApiError(
            502,
            "AI returned invalid JSON"
        );
    }

    const validationResult = reviewResponseSchema.safeParse(parsedResponse);

    if (!validationResult.success) {
        throw new ApiError(
            502,
            "AI returned an invalid review format",
            validationResult.error.issues
        );
    }

    return validationResult.data;

}

async function generateChatResponse(
    code,
    language,
    review,
    messages,
    question
) {
    const result = await generateGeminiResponse({
        model: GEMINI_MODEL,

        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `You are a Senior Software Engineer helping a developer improve their code.

                        The programming language is ${language}.

                        The following code has already been reviewed.

                        Original Code:
                        ${code}

                        Previous AI Review:
                       Summary:
                        ${review.summary}

                        Strengths:
                        ${review.strengths.join(", ")}

                        Weaknesses:
                        ${review.weaknesses.join(", ")}

                        Conversation History:
                        ${messages
                        .map((msg) => `${msg.role}: ${msg.content}`)
                        .join("\n")}

                        Latest User Question:
                        ${question}

                        Instructions:

                        - Answer ONLY the latest user question.
                        - Use the previous review and conversation as context.
                        - Do NOT regenerate the complete review.
                        - Do NOT repeat information unless the user asks for it.
                        - If the user asks for code changes, return only the relevant code snippet.
                        - If the user asks for an explanation, explain only that specific concept.
                        - Respond in plain text. Do not use Markdown code fences.`
                    }
                ]
            }
        ],

        config: {
            temperature: 0.3
        }
    });

    return result.text.trim();
}

    

module.exports = {
    generateContent,
    generateChatResponse
};


