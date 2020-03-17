const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Project = require("../models/Project");

//@desc    Get all project cars
//@route   GET /api/v1/projects
//@access  Public
exports.getProjects = asyncHandler(async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query }

    // Fields to exclude.
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Removing fields to be excluded
    removeFields.forEach(param => delete reqQuery[param]);

    // Creating a query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Project.find(JSON.parse(queryStr));

    // Select fields
    if(req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Project.countDocuments();

    query = query.skip(skip).limit(limit);

    // Executing query
    const projects = await query;

    // Pagination result
    const pagination = {};

    if(endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      }
    }

    if(startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      pagination,
      data: projects
    });
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
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(
        new ErrorResponse(
          `Project not found with an id of: ${req.params.id}`,
          404
        )
      );
    }

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
