const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Schedule's name is required"],
  },
  location: {
    type: String,
    required: [true, "Please you have to specify a location"],
  },
  date: {
    type: Date,
    required: [true, "Please enter the date of the schedule"],
  },
  from: {
    type: String,
    required: [true, "At what clock the schedule begun"],
  },
  to: {
    type: String,
    required: [true, "At what clock the schedule end"],
  },
  completed: {
    type: Boolean,
  },
});

scheduleSchema.pre("save", function (next) {
  this.completed = false;
  next();
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
