const express = require("express");
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
} = require("../controllers/posts");

const Post = require("../models/Post");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Post, {
      path: "projects",
      select: "name description"
    }),
    getPosts
  )
  .post(protect, addPost);
router
  .route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
