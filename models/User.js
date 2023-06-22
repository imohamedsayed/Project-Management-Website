const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please let us have your name"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// fire a function after a document saved to db

userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved ", doc);
  next();
});

// fire a function before a document saved to db

userSchema.pre("save", function (next) {
  console.log("user about to be saved : ", this);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
