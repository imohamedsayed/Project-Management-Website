const { Router } = require("express");
const router = Router();
const HomeController = require("../controllers/HomeController");
const {requireAuth} = require("../middleware/AuthMiddleware");

router.get("/", HomeController.get_landing_page);
router.get("/home", requireAuth, HomeController.get_home_page);

module.exports = router;
