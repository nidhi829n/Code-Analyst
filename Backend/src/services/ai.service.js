const axios = require("axios");

async function generateContent(code) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    {
      contents: [
        {
          parts: [{ text: code }]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        key: process.env.GOOGLE_GEMINI_KEY
      }
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

module.exports = generateContent;



