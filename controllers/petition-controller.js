class PetitionController {
    static home(req, res) {
        res.render("petition");
    }

    static createPetition(req, res) {
        console.log(req.body);
        res.redirect("/petition");
    }
}

module.exports = PetitionController;
