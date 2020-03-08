//@desc    Get all project cars
//@route   GET /api/v1/projects
//@access  Public
exports.getProjects = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get all project cars" });
};

//@desc    Get a project car
//@route   GET /api/v1/projects/:id
//@access  Public
exports.getProject = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get project car ${req.params.id}` });
};

//@desc    Create new project car
//@route   POST /api/v1/projects
//@access  Private
exports.createProject = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new project car" });
};

//@desc    Update a project car
//@route   PUT /api/v1/projects/:id
//@access  Private
exports.updateProject = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update project car ${req.params.id}` });
};

//@desc    Delete a project car
//@route   DELETE /api/v1/projects/:id
//@access  Private
exports.deleteProject = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete project car ${req.params.id}` });
};
