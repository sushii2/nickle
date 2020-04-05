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

// Prevent user from submitting more than one review per project
ReviewSchema.index({ project: 1, user: 1}, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(projectId) {
  const obj = await this.aggregate([
    {
      $match: { project: projectId }
    },
    {
      $group: {
        _id: '$project',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Project').findByIdAndUpdate(projectId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.project);
});

// Call getAverageCost before remove
ReviewSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.project);
});

module.exports = mongoose.model("Review", ReviewSchema);
