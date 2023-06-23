const User = require("../models/User");
const jwt = require("jsonwebtoken");
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

// Create token

const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "mso 1478 9632", { expiresIn: maxAge });
};

// handle requests
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
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  get_login,
  get_signup,
  login_post,
  signup_post,
};
