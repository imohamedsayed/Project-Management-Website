const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
    // required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  googleId: {
    type: String,
    unique: true,
  },
});

// fire a function after a document saved to db

userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved ", doc);
  next();
});

// fire a function before a document saved to db

userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// login user

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const passwordFlag = await bcrypt.compare(password, user.password);
    if (passwordFlag) {
      return user;
    }
    throw Error("Incorrect Password");
  } else {
    throw Error("Incorrect email");
  }
};

userSchema.statics.changePassword = async function (id, old, newPass) {
  const user = await this.findById(id);
  const passwordFlag = await bcrypt.compare(old, user.password);

  if (passwordFlag) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const updatedUser = this.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    return updatedUser;
  } else {
    throw Error("Incorrect Password");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
