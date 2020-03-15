const ErrorResponse = require("../utils/errorResponse");
const Project = require("../models/Project");

//@desc    Get all project cars
//@route   GET /api/v1/projects
//@access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc    Get a project car
//@route   GET /api/v1/projects/:id
//@access  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(
        new ErrorResponse(
          `Project not found with an id of: ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(
      new ErrorResponse(
        `Project not found with an id of: ${req.params.id}`,
        404
      )
    );
  }
};

//@desc    Create new project car
//@route   POST /api/v1/projects
//@access  Private
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc    Update a project car
//@route   PUT /api/v1/projects/:id
//@access  Private
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc    Delete a project car
//@route   DELETE /api/v1/projects/:id
//@access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
