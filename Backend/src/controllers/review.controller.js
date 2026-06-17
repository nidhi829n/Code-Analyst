const Review = require("../models/review");

module.exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user.id,
})
.sort({
  createdAt: -1,
});
    res.status(200).json(reviews);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
};

module.exports.getReviewById = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(review);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {

    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports.getStats = async (req, res) => {
  try {

    const reviews = await Review.find({
      user: req.user.id,
    });

    const totalReviews = reviews.length;

    const languagesUsed =
      [...new Set(
        reviews.map(
          (review) => review.language
        )
      )].length;

    res.status(200).json({
      totalReviews,
      languagesUsed,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stats",
    });

  }
};