const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");

router.get("/", HomeController.get_landing_page);
router.get("/home", HomeController.get_home_page);

module.exports = router;