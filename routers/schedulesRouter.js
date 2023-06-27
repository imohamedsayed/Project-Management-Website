const { Router } = require("express");
const router = Router();
const ScheduleController = require("../controllers/SchedulesController");
const { requireAuth } = require("../middleware/AuthMiddleware");

router.get("/schedules", requireAuth, ScheduleController.index);
router.get(
  "/schedules/create",
  requireAuth,
  ScheduleController.schedule_create_get
);
router.post(
  "/schedules/create",
  requireAuth,
  ScheduleController.schedule_create_post
);
router.get(
  "/schedules/allSchedules",
  requireAuth,
  ScheduleController.get_schedules
);

router.get("/schedules/:id", requireAuth, ScheduleController.schedule_edit_get);
router.put("/schedules/:id", requireAuth, ScheduleController.schedule_edit_put);
router.delete(
  "/schedules/:id",
  requireAuth,
  ScheduleController.delete_schedule
);

router.get(
  "/todaySchedules",
  requireAuth,
  ScheduleController.today_schedules_get
);

module.exports = router;
