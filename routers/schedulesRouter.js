const { Router } = require("express");
const router = Router();
const ScheduleController = require("../controllers/SchedulesController");
const {requireAuth} = require("../middleware/AuthMiddleware");

router.get("/schedules", requireAuth, ScheduleController.index);
router.get(
  "/schedules/create",
  requireAuth,
  ScheduleController.schedule_create_get
);

module.exports = router;
