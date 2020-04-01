const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: [true, "Please add a review title."],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: 250
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating for this project."]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
