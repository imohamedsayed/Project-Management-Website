const get_projects = (req, res) => {
  res.render("projects", { title: "My Projects" });
};
const create_project_get = (req, res) => {
  res.render("addProject", { title: "Create Project" });
};
module.exports = { get_projects, create_project_get };
