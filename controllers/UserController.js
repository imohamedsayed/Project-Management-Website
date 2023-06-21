const settings_get = (req, res) => {
  res.render("settings", { title: "Settings" });
};

module.exports = { settings_get };
