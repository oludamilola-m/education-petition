const express = require("express");
const router = express.Router();

const PetitionController = require("../controllers/petition-controller");

router.get("/", (req, res) => {
    res.redirect("/petition");
});

router.get("/petition", PetitionController.home);
router.post("/petition", PetitionController.createPetition);
router.post("/signature/delete", PetitionController.deleteUserSignature);
router.get("/thanks", PetitionController.thanks);
router.get("/signers", PetitionController.getAllSignatories);

//get city
router.get("/signers/:city", PetitionController.getSignersByCity);
module.exports = router;
