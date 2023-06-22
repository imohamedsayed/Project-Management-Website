const User = require("../models/User");

// Handle errors

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  // unique error code
  if (err.code == 11000) {
    errors.email = "This email is already exists";
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const get_login = (req, res) => {
  res.render("auth/login", { title: "Login" });
};
const get_signup = (req, res) => {
  res.render("auth/sign", { title: "Signup" });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  res.send("login");
};

const signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = {
  get_login,
  get_signup,
  login_post,
  signup_post,
};
