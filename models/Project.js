const mongoose = require("mongoose");
const { isDate } = require("validator");

const projectSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "The project must have a name"],
  },
  date: {
    type: Date,
    required: [true, "The deadline is required"],
    validator: [isDate, "Deadline must be in a date format"],
  },
  completed: {
    type: Boolean,
  },
});

projectSchema.pre("save", function (next) {
  this.completed = false;
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
