const express = require('express');
const router = express.Router();

router.get("/api/v1/projects", (req, res) => {
  res.status(200).json({ success: true, msg: "Get all project cars" });
});

router.get("/api/v1/projects/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Get project car ${req.params.id}` });
});

router.post("/api/v1/projects", (req, res) => {
  res.status(200).json({ success: true, msg: "Create new project car" });
});

router.put("/api/v1/projects/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Display project car ${req.params.id}` });
});

router.delete("/api/v1/projects/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete project car ${req.params.id}` });
});
