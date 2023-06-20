const get_login = (req, res) => {
  res.render("auth/login", { title: "Login" });
};
const get_signup = (req, res) => {
  res.render("auth/sign", { title: "Create Account" });
};

module.exports = {
  get_login,
  get_signup,
};
