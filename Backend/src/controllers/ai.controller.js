const generateContent = require("../services/ai.service");
const Review = require("../models/review");

module.exports.getReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

   const review = await generateContent(code);
       
       await Review.create({
            user: req.user.id,

            code,

            language,

            review,
      });

     res.json(review);

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
};
