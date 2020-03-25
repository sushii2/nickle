const express = require("express");
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsinRadius
} = require("../controllers/projects");

const Project = require('../models/Project');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const postRouter = require('./posts');

const router = express.Router();

// Re-route into other resource routers
router.use('/:projectId/posts', postRouter);

router.route("/radius/:zipcode/:distance").get(getProjectsinRadius);

router
  .route("/")
  .get(advancedResults(Project, 'posts'), getProjects)
  .post(createProject);

router
  .route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
