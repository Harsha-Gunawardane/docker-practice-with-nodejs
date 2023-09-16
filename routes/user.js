const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.route("/register").post(authController.signUp);
router.route("/login").post(authController.login);

module.exports = router;
