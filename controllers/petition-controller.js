const {
    addSignatory,
    getSignature,
    getAllSignature,
    getTotalSigners,
    getUsersProfileInfo,
} = require("../db");

class PetitionController {
    static home(req, res) {
        const { error } = req.session;
        req.session.error = null;
        getSignature(req.session.user.id)
            .then(({ rows }) => {
                // console.log("rows count", rows.length);
                if (rows.length > 0) {
                    return res.redirect("/thanks");
                } else {
                    res.render("petition", { error });
                }
            })
            .catch((err) => {
                res.render("petition", { error });
            });
    }

    static createPetition(req, res) {
        const { signature } = req.body;
        const { user } = req.session;
        //console.log("user", user);
        addSignatory(signature, user, new Date())
            .then((signatory) => {
                req.session.signatoryId = signatory.rows[0].id;
                res.redirect("/thanks");
            })
            .catch((err) => {
                console.log("err", err);
                req.session.error = "An error occured";
                res.redirect("/petition");
            });
    }

    static thanks(req, res) {
        getSignature(req.session.userId)
            .then(({ rows }) => {
                const signature = rows[0].signature;
                getTotalSigners()
                    .then(({ rows }) => {
                        console.log("rows[0].count: ", rows[0].count);
                        res.render("thanks", {
                            signature,
                            total: rows[0].count,
                        });
                    })
                    .catch((err) => {
                        return res.redirect("/petition");
                    });
            })
            .catch((err) => {
                return res.redirect("/petition");
            });
    }

    static getAllSignatories(req, res) {
        console.log("i can run......");
        // getAllSignature();
        getUsersProfileInfo()
            .then(({ rows }) => {
                console.log("rows ", rows);
                res.render("signers", {
                    signers: rows,
                    helpers: {
                        capitalize(str) {
                            return str.slice(0, 1).toUpperCase() + str.slice(1);
                        },
                    },
                });
            })
            .catch((err) => {
                console.log("err: ", err);
                return res.redirect("/petition");
            });
    }
}

module.exports = PetitionController;
