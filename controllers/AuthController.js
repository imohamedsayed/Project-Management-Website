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

  if (err.message.includes("Incorrect email")) {
    errors.email = "This email is not registered";
  }
  if (err.message.includes("Incorrect Password")) {
    errors.password = "Password is incorrect";
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
  let user = req.cookies.jwt;
  if (!user) {
    res.render("auth/login", { title: "Login" });
  } else {
    res.redirect("/home");
  }
};
const get_signup = (req, res) => {
  let user = req.cookies.jwt;
  if (!user) {
    res.render("auth/sign", { title: "Signup" });
  } else {
    res.redirect("/home");
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
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

const logout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  try {
    req.logout();
  } catch (err) {}
  res.redirect("/");
};

const passAuth = (req, res) => {
  const user = req.user;
  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.redirect("/home");
};

module.exports = {
  get_login,
  get_signup,
  login_post,
  signup_post,
  logout,
  passAuth,
};
