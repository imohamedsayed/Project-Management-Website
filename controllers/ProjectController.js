const Project = require("../models/Project");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  const errors = { name: "", date: "" };
  Object.values(err.errors).forEach(({ properties }) => {
    if (properties) {
      errors[properties.path] = properties.message;
    }
  });

  return errors;
};

const getTodayProjects = (projects) => {
  const now = new Date();
  const today = now.getDate(),
    currentMonth = now.getMonth() + 1,
    currentYear = now.getFullYear(),
    currentTime = now.getTime();

  let results = [];
  projects.forEach((project) => {
    const projectDate = new Date(project.date);

    const ProjectDay = projectDate.getDate(),
      projectMonth = projectDate.getMonth() + 1,
      projectYear = projectDate.getFullYear(),
      projectTime = projectDate.getTime();

    if (
      currentYear === projectYear &&
      currentMonth === projectMonth &&
      today === ProjectDay &&
      currentTime < projectTime
    ) {
      results.push(project);
    }
  });

  return results;
};

const getInProgressProjects = (projects) => {
  const now = new Date();
  let results = [];

  projects.forEach((project) => {
    let projectDate = new Date(project.date);
    if (now < projectDate && now.getDate() != projectDate.getDate()) {
      results.push(project);
    }
  });

  return results;
};

const getCompletedProjects = (projects) => {
  const now = new Date();

  let results = projects.filter((project) => {
    let projectDate = new Date(project.date);
    if (project.completed && projectDate < now) {
      return project;
    }
  });

  return results;
};

const getNotCompletedProjects = (projects) => {
  const now = new Date();

  let results = projects.filter((project) => {
    let projectDate = new Date(project.date);
    if (!project.completed && projectDate < now) {
      return project;
    }
  });

  return results;
};

const allNotYetCompletedTasks = (projects) => {
  const now = new Date();

  let results = projects.filter((project) => {
    let projectDate = new Date(project.date);
    if (projectDate > now) {
      return project;
    }
  });

  return results;
};
const allNotCompletedTasks = (projects) => {
  let results = projects.filter((project) => !project.completed);
  return results;
};
const getAllMarkedCompletedProjects = (projects) => {
  let results = projects.filter((project) => {
    if (project.completed) {
      return project;
    }
  });

  return results;
};
// Requests
const get_projects = (req, res) => {
  res.render("projects", { title: "My Projects" });
};

const get_today_projects = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });

    let today = getTodayProjects(projects);

    res.status(200).json({ projects: today });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const get_inProgress_projects = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });

    let p = getInProgressProjects(projects);

    res.status(200).json({ projects: p });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const get_completed_projects = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });

    let p = getCompletedProjects(projects);

    res.status(200).json({ projects: p });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const get_notCompleted_projects = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });

    let p = getNotCompletedProjects(projects);

    res.status(200).json({ projects: p });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const get_performance = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });

    let c = getAllMarkedCompletedProjects(projects).length;

    if (projects.length) {
      res.status(200).json({ performance: (c / projects.length) * 100 });
    } else {
      res.status(200).json({ performance: 0 });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

const get_projects_status = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });
    const completedProjects = getCompletedProjects(projects).length;
    const notCompletedProjects = allNotCompletedTasks(projects).length;
    const totalProjects = projects.length;
    const inprogressProjects = getInProgressProjects(projects).length;
    res.status(200).json({
      stats: {
        total_projects: totalProjects,
        completed_projects: completedProjects,
        not_completed: notCompletedProjects,
        inprogress_projects: inprogressProjects,
      },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const create_project_get = (req, res) => {
  res.render("addProject", { title: "Create Project" });
};

const create_project_post = async (req, res) => {
  const { name, date } = req.body;
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;

  try {
    let result = await Project.create({
      userId: id,
      name: name,
      date: new Date(date),
    });
    res.status(200).json({ project: result._id });
  } catch (err) {
    const errors = handleErrors(err);
    if (date == undefined) {
      errors.date = "the deadline date is required";
    }
    res.status(400).json({ errors });
  }
};

const change_project_status = async (req, res) => {
  try {
    let result = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { completed: req.body.status }
    );

    res.status(200).json({ project: result });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const edit_project_get = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render("editProject", { title: "Edit Project", project });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const edit_project_put = async (req, res) => {
  try {
    let result = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    );
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getRunningTasks = async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, "mso 1478 9632").id;
  try {
    const projects = await Project.find({ userId: id });

    let p = allNotYetCompletedTasks(projects);

    res.status(200).json({ tasks: p });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const delete_project = async (req, res) => {
  try {
    let results = await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ results });
  } catch (err) {
    res.status(400).json({ err });
  }
};
const delete_All_projects = async (req, res) => {
  try {
    let results = await Project.deleteMany({});

    res.status(200).json({ results });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  get_projects,
  create_project_get,
  create_project_post,
  get_today_projects,
  get_inProgress_projects,
  get_completed_projects,
  get_notCompleted_projects,
  get_performance,
  change_project_status,
  edit_project_get,
  edit_project_put,
  get_projects_status,
  getRunningTasks,
  delete_project,
  delete_All_projects,
};
