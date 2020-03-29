const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc    Register User
//@route   GET /api/v1/auth/register
//@access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, username, email, password, role } = req.body;

    // Create user
    const user = await User.create({
        name,
        username,
        email,
        password,
        role
    });

    res.status(200).json({ success: true });
});