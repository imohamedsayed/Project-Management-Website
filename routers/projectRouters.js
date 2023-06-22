const { Router } = require("express");
const router = Router();
const ProjectController = require("../controllers/ProjectController");

router.get("/projects", ProjectController.get_projects);
router.get("/projects/create", ProjectController.create_project_get);

module.exports = router;
