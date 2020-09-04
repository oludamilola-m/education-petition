const {
    addSignatory,
    getSignature,
    getAllSignature,
    getNumbersOfRows,
} = require("../db");

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

        getSignature(id)
            .then(({ rows }) => {
                const signature = rows[0].signature;
                getNumbersOfRows().then(({ rows }) => {
                    res.render("thanks", { signature, total: rows[0].count });
                });
            })
            .catch((err) => {
                return res.redirect("/petition");
            });
    }

    static getAllSignatories(req, res) {
        getAllSignature()
            .then(({ rows }) => {
                res.render("signers", {
                    signers: rows,
                });
            })
            .catch((err) => {
                return res.redirect("/petition");
            });
    }
}

module.exports = PetitionController;
