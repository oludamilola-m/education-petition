const { addSignatory, getSignature } = require("../db");

class PetitionController {
    static home(req, res) {
        res.render("petition");
    }

    static createPetition(req, res) {
        const { firstName, lastName, signature } = req.body;
        addSignatory(firstName, lastName, signature, new Date())
            .then((signatory) => {
                req.session.signatoryId = signatory.rows[0].id;
                res.redirect("/thanks");
            })
            .catch((err) => {
                console.log(err);
                res.redirect("/petition");
            });
    }

    static thanks(req, res) {
        const id = req.session.signatoryId;
        if (!id) {
            return res.redirect("/petition");
        }
        getSignature(id)
            .then(({ rows }) => {
                res.render("thanks", { signature: rows[0].signature });
            })
            .catch((err) => {
                return res.redirect("/petition");
            });
    }
}

module.exports = PetitionController;
