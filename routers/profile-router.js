const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile-controller");

router.get("/edit", ProfileController.updateUser);
router.post("/edit", ProfileController.updateUserInfo);
router.get("/", ProfileController.getProfileDetails);
router.post("/", ProfileController.profile);

module.exports = router;
