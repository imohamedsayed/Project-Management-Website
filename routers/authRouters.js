const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/AuthController");
const {requireAuth} = require("../middleware/AuthMiddleware");

router.get("/login", AuthController.get_login);
router.post("/login", AuthController.login_post);

router.get("/signup", AuthController.get_signup);
router.post("/signup", AuthController.signup_post);

router.get("/logout", requireAuth, AuthController.logout);

module.exports = router;
