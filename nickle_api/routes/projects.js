const express = require("express");
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsinRadius
} = require("../controllers/projects");
const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getProjectsinRadius);

router
  .route("/")
  .get(getProjects)
  .post(createProject);

router
  .route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
