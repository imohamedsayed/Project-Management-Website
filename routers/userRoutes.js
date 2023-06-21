const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/settings", UserController.settings_get);

module.exports = router;
