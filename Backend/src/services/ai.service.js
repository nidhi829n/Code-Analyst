const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY
});

async function generateContent(code) {
  console.log("KEY EXISTS:", !!process.env.GOOGLE_GEMINI_KEY);
  console.log("KEY LENGTH:", process.env.GOOGLE_GEMINI_KEY?.length);

  const result = await genAI.models.generateContent({
    model: "models/gemini-1.0-pro", // ✅ supported & stable

    systemInstruction: `
You are a strict code reviewer.

You must ONLY review the given code.

DO NOT:
- Explain concepts
- Write tutorials
- Provide multiple options
- Add example usage
- Add paragraphs
- Add theory

You MUST reply ONLY in this format:

❌ Bad Code:
\`\`\`javascript
<original code>
\`\`\`

🔍 Issues:
- <list concrete issues>

✅ Recommended Fix:
\`\`\`javascript
<corrected code>
\`\`\`

Rules:
- Do not write anything outside this format.
`,

    contents: [
      {
        role: "user",
        parts: [
          { text: code }
        ]
      }
    ],

    generationConfig: {
      temperature: 0.1
    }
  });

  
  const text =
    result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  return text;
}

module.exports = generateContent;

