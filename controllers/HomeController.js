const get_landing_page = (req, res) => {
  res.render("landingPage", { title: "Landing Page" });
};
const get_home_page = (req, res) => {
  res.render("home", { title: "Home" });
};

module.exports = { get_landing_page, get_home_page };
