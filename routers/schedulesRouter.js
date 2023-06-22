const { Router } = require("express");
const router = Router();
const ScheduleController = require("../controllers/SchedulesController");

router.get("/schedules", ScheduleController.index);
router.get("/schedules/create", ScheduleController.schedule_create_get);

module.exports = router;
