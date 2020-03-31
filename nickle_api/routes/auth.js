const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/forgotpassword", forgotPassword);

module.exports = router;
