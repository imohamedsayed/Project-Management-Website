const { Router } = require("express");
const router = Router();
const ProjectController = require("../controllers/ProjectController");
const { requireAuth } = require("../middleware/AuthMiddleware");

router.get("/projects", requireAuth, ProjectController.get_projects);
router.get(
  "/projects/create",
  requireAuth,
  ProjectController.create_project_get
);
router.post(
  "/projects/create",
  requireAuth,
  ProjectController.create_project_post
);

router.get(
  "/projects/today",
  requireAuth,
  ProjectController.get_today_projects
);
router.get(
  "/projects/inprogress",
  requireAuth,
  ProjectController.get_inProgress_projects
);
router.get(
  "/projects/completed",
  requireAuth,
  ProjectController.get_completed_projects
);
router.get(
  "/projects/notCompleted",
  requireAuth,
  ProjectController.get_notCompleted_projects
);

router.get(
  "/projects/runningTasks",
  requireAuth,
  ProjectController.getRunningTasks
);

router.get("/performance", requireAuth, ProjectController.get_performance);
router.get(
  "/projects/stats",
  requireAuth,
  ProjectController.get_projects_status
);
router.get(
  "/projects/edit/:id",
  requireAuth,
  ProjectController.edit_project_get
);

router.delete("/project/:id", requireAuth, ProjectController.delete_project);
router.delete("/projects", requireAuth, ProjectController.delete_All_projects);

router.put(
  "/projects/edit/:id",
  requireAuth,
  ProjectController.edit_project_put
);

router.put(
  "/project/:id",
  requireAuth,
  ProjectController.change_project_status
);

module.exports = router;
