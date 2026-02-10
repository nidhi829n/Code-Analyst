const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY
});

async function generateContent(code) {

  console.log("KEY EXISTS:", !!process.env.GOOGLE_GEMINI_KEY);
  console.log("KEY LENGTH:", process.env.GOOGLE_GEMINI_KEY?.length);

  const result = await genAI.models.generateContent({
    model: "gemini-1.5-flash",

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
- Do not say "Option 1", "Option 2".
- Do not add extra explanations.
`,

    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Review the following code strictly and follow the required format:\n\n${code}`
          }
        ]
      }
    ],

    generationConfig: {
      temperature: 0.1
    }
  });

  return result.response.text();
}

module.exports = generateContent;
