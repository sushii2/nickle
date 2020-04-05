const express = require("express");
const { getReviews, getReview, addReview } = require("../controllers/reviews");

const Review = require("../models/Post");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.route("/").get(
  advancedResults(Review, {
    path: "projects",
    select: "name description"
  }),
  getReviews
).post(protect, addReview);

router.route("/:id").get(getReview);

module.exports = router;
