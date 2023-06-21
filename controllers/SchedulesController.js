const index = (req, res) => {
  res.render("Schedules", { title: "Schedules" });
};
const schedule_create_get = (req, res) => {
  res.render("addSchedule", { title: "Schedules" });
};

module.exports = {
  index,
  schedule_create_get,
};
