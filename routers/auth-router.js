const express = require("express");
const router = express.Router();

const RegistrationController = require("../controllers/registration-controller");
const AuthController = require("../controllers/auth-controller");

//registration
router.get("/registration", RegistrationController.getSignUp);
router.post("/registration", RegistrationController.createUser);

//Login
router.get("/login", AuthController.getLogIn);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

module.exports = router;
