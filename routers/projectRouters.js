const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");

router.get("/projects", ProjectController.get_projects);
router.get("/projects/create", ProjectController.create_project_get);

module.exports = router;
