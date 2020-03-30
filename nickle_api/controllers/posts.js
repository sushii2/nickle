const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const Project = require("../models/Project");

//@desc    Get all progress posts
//@route   GET /api/v1/posts
//@route   GET /api/v1/projects/:projectId/posts
//@access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  if (req.params.projectId) {
    const posts = await Post.find({ project: req.params.projectId });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc    Get a single progress post
//@route   GET /api/v1/posts/:id
//@access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "project",
    select: "name description"
  });

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

//@desc    Add a progress post
//@route   POST /api/v1/projects/:projectId/posts
//@access  Private
exports.addPost = asyncHandler(async (req, res, next) => {
  req.body.project = req.params.projectId;
  req.body.user = req.user.id;

  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(
        `No project with the id of ${req.params.projectId}`,
        404
      )
    );
  }

  if (project.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a post to this project ${project._id}`,
        404
      )
    );
  }
  
  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    data: post
  });
});

//@desc    Update a progress post
//@route   PUT /api/v1/posts/:id
//@access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update a post to this project ${project._id}`,
        404
      )
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: post
  });
});

//@desc    Delete a progress post
//@route   DELETE /api/v1/posts/:id
//@access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete a post to this project ${project._id}`,
        404
      )
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
