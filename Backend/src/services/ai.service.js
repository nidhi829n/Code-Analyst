const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY,
});

async function generateContent(
    code,
    language
    
)  {
    const result = await genAI.models.generateContent({
        model: "models/gemini-flash-latest",
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

        generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
        },
    });

    const cleanedResponse = result.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

console.log("===== GEMINI RESPONSE =====");
console.log(cleanedResponse);
console.log("===========================");

try {
    return JSON.parse(cleanedResponse);
} catch (error) {

  console.log(error.response);

  console.log(error.response?.data);

  console.log(error);

}

}

async function generateChatResponse(
    code,
    language,
    review,
    messages,
    question
) {
    const result = await genAI.models.generateContent({
        model: "models/gemini-flash-latest",

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

        generationConfig: {
            temperature: 0.3
        }
    });

    return result.text.trim();
}

    

module.exports = {
    generateContent,
    generateChatResponse
};


