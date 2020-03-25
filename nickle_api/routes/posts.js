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

router
  .route("/")
  .get(
    advancedResults(Post, {
      path: "projects",
      select: "name description"
    }),
    getPosts
  )
  .post(addPost);
router
  .route("/:id")
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
