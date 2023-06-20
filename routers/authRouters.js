const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.get("/login", AuthController.get_login);

router.get("/signup", AuthController.get_signup);

module.exports = router;
