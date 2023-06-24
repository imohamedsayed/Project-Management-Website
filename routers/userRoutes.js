const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/UserController");
const {requireAuth} = require("../middleware/AuthMiddleware");

router.get("/settings", requireAuth, UserController.settings_get);

module.exports = router;
