const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user-controller");
const AuthController = require("../controllers/auth-controller");

//registration
router.get("/registration", UserController.getSignUp);
router.post("/registration", UserController.createUser);

//Login
router.get("/login", AuthController.getLogIn);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

module.exports = router;
