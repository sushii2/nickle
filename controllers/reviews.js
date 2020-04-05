const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Project = require("../models/Project");

//@desc    Get all reviews
//@route   GET /api/v1/reviews
//@route   GET /api/v1/projects/:projectId/reviews
//@access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.projectId) {
    const reviews = await Review.find({
      project: req.params.projectId
    }).populate({
      path: "user",
      select: "username, name"
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc    Get single review
//@route   GET /api/v1/reviews/:id
//@access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: "project",
      select: "name description"
    })
    .populate({
      path: "user",
      select: "name, username"
    });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc      Add review
// @route     POST /api/v1/bootcamps/:bootcampId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.project = req.params.projectId;
  req.body.user = req.user.id;

  const project = await project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(
        `No project with the id of ${req.params.project}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});
