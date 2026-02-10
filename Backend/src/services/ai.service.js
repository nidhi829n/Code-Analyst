const { GoogleGenerativeAI } = require("@google/genai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(code) {
 
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const result = await model.generateContent(code);


  const response = result.response;
  const text = response.text();

  return text;
}

module.exports = generateContent;




