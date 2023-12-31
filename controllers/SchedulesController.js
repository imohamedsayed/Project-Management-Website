const jwt = require("jsonwebtoken");
const Schedule = require("../models/Schedule");

const handleErrors = (err) => {
  const errors = { name: "", location: "", date: "", from: "", to: "" };

  if (err.message.includes("Schedule validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const getArrangedSchedules = (schedules) => {
  const results = {};

  schedules.forEach((schedule) => {
    let scheduleDate = new Date(schedule.date);
    const month = scheduleDate.toLocaleString("en-US", { month: "long" });
    if (month in results) {
      results[month].push(schedule);
    } else {
      results[month] = [];
      results[month].push(schedule);
    }
  });

  return results;
};

const getTodaySchedules = (schedules) => {
  const now = new Date();
  let results = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.date);

    if (
      scheduleDate.getDate() == now.getDate() &&
      scheduleDate.getMonth() == now.getMonth() &&
      scheduleDate.getFullYear() == now.getFullYear()
    ) {
      return schedule;
    }
  });

  return results;
};

const index = (req, res) => {
  res.render("Schedules", { title: "Schedules" });
};

const schedule_create_get = (req, res) => {
  res.render("addSchedule", { title: "Schedule" });
};
const schedule_create_post = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  const { name, location, date, from, to } = req.body;
  try {
    const schedule = await Schedule.create({
      userID: id,
      name,
      location,
      date,
      from,
      to,
    });
    console.log(schedule);
    res.status(200).json({ schedule });
  } catch (err) {
    // handle errors
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

const schedule_edit_get = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.render("editSchedule", { title: "Edit Schedule", schedule: schedule });
  } catch (err) {
    res.status(404).render("404", { title: "Not Found" });
  }
};
const schedule_edit_put = async (req, res) => {
  const id = req.params.id;
  const { name, location, date, from, to } = req.body;
  try {
    const schedule = await Schedule.findByIdAndUpdate(id, {
      name,
      location,
      date,
      from,
      to,
    });
    res.status(200).json(schedule);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

const get_schedules = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const schedules = await Schedule.find({ userID: id }).sort({ date: 1 });

    const arrangedSchedules = getArrangedSchedules(schedules);

    res.status(200).json({ schedules: arrangedSchedules });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const delete_schedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    res.status(200).json({ schedule: schedule });
  } catch (err) {
    res.status(404).render("404", { title: "Not Found" });
  }
};

const today_schedules_get = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const schedules = await Schedule.find({ userID: id }).sort({ date: 1 });
    const todaySchedules = getTodaySchedules(schedules);
    res.status(200).json({ schedules: todaySchedules });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  index,
  schedule_create_get,
  schedule_edit_get,
  schedule_create_post,
  get_schedules,
  schedule_edit_put,
  delete_schedule,
  today_schedules_get,
};
