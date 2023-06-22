const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/UserController");

router.get("/settings", UserController.settings_get);

module.exports = router;
