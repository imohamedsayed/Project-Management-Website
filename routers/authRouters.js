const { Router } = require("express");
const router = Router();
const AuthController = require("../controllers/AuthController");
const { requireAuth } = require("../middleware/AuthMiddleware");

const passport = require("passport");

router.get("/login", AuthController.get_login);
router.post("/login", AuthController.login_post);

router.get("/signup", AuthController.get_signup);
router.post("/signup", AuthController.signup_post);

router.get("/logout", requireAuth, AuthController.logout);

/*
    --> Google Auth
*/

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback google auth router
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  AuthController.passAuth
);

module.exports = router;
