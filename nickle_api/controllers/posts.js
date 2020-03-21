const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");

//@desc    Get all progress posts
//@route   GET /api/v1/posts
//@route   GET /api/v1/projects/:projectId/posts
//@access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.projectId) {
        query = Post.find({ project: req.params.projectId });
    } else {
        query = (await Post.find()).populate({
            path: 'projects',
            select: 'name description'
        });
    }

    const posts = await query;

    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    })
})