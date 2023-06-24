const { Router } = require("express");
const router = Router();
const ProjectController = require("../controllers/ProjectController");
const {requireAuth} = require("../middleware/AuthMiddleware");

router.get("/projects", requireAuth, ProjectController.get_projects);
router.get(
  "/projects/create",
  requireAuth,
  ProjectController.create_project_get
);

module.exports = router;
