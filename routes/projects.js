const express = require("express");
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsinRadius
} = require("../controllers/projects");

const Project = require("../models/Project");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const postRouter = require("./posts");
const reviewRouter = require("./reviews");

const router = express.Router();

const { protect } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:projectId/posts", postRouter);
router.use("/:projectId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getProjectsinRadius);

router
  .route("/")
  .get(advancedResults(Project, "posts"), getProjects)
  .post(protect, createProject);

router
  .route("/:id")
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
