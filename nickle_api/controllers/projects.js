const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Project = require("../models/Project");

//@desc    Get all project cars
//@route   GET /api/v1/projects
//@access  Public
exports.getProjects = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//@desc    Get a project car
//@route   GET /api/v1/projects/:id
//@access  Public
exports.getProject = asyncHandler(async (req, res, next) => {
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
});

//@desc    Create new project car
//@route   POST /api/v1/projects
//@access  Private
exports.createProject = asyncHandler(async (req, res, next) => {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
});

//@desc    Update a project car
//@route   PUT /api/v1/projects/:id
//@access  Private
exports.updateProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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
});

//@desc    Delete a project car
//@route   DELETE /api/v1/projects/:id
//@access  Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(
        new ErrorResponse(
          `Project not found with an id of: ${req.params.id}`,
          404
        )
      );
    }

    project.remove();

    res.status(200).json({ success: true, data: {} });
});

//@desc    Get projects within a radius
//@route   GET /api/v1/projects/radius/:zipcode/:distance
//@access  Private
exports.getProjectsinRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lang from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  const radius = distance / 6378
  const projects = await Project.find({
    location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
  })

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  })
});
