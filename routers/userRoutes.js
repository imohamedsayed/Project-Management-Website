const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/UserController");
const {requireAuth} = require("../middleware/AuthMiddleware");

router.get("/settings", requireAuth, UserController.settings_get);
router.post("/settings/update_name", requireAuth, UserController.edit_name);
router.post("/settings/update_email", requireAuth, UserController.edit_email);
router.post("/settings/update_password", requireAuth, UserController.edit_password);

module.exports = router;
