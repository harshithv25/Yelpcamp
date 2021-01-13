const express = require("express");
const router = express.Router();

router.post(
  "/reviews",
  validateReview,
  asyncErr(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.campground = campground;
    await campground.save();
    await review.save();
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

router.delete(
  "/reviews/:reviewId",
  asyncErr(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    await campground.save();
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;