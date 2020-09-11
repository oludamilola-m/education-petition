const {
    addSignatory,
    getSignature,
    getTotalSigners,
    getSigners,
    deleteSignature,
    findSignersByCity,
} = require("../db");

class PetitionController {
    static home(req, res) {
        const { error } = req.session;
        req.session.error = null;
        getSignature(req.session.user.id)
            .then(({ rows }) => {
                if (rows.length > 0) {
                    return res.redirect("/thanks");
                } else {
                    return res.render("petition");
                }
            })
            .catch((err) => {
                console.log("errpr is", err);
                res.render("petition", { error });
            });
    }

    static createPetition(req, res) {
        const { signature } = req.body;
        const { user } = req.session;
        addSignatory(signature, user, new Date())
            .then(({ rows }) => {
                req.session.signatoryId = rows[0].id;
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
                if (rows.length === 0) {
                    return res.redirect("/petition");
                }
                const signature = rows[0].signature;
                getTotalSigners()
                    .then(({ rows }) => {
                        res.render("thanks", {
                            signature,
                            total: rows[0].count,
                        });
                    })
                    .catch((err) => {
                        console.log("err: ", err);
                        return res.redirect("/petition");
                    });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }

    static getAllSignatories(req, res) {
        getSigners()
            .then(({ rows }) => {
                const signed = rows.some((row) => {
                    return row.user_id === req.session.userId;
                });

                if (!signed) {
                    return res.redirect("/petition");
                }
                res.render("signers", {
                    signers: rows,
                    helpers: {
                        capitalize(str) {
                            if (!str) {
                                return "";
                            }
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

    static deleteUserSignature(req, res) {
        deleteSignature(req.session.userId)
            .then(() => {
                res.redirect("/petition");
            })
            .catch((err) => {
                res.redirect("/thanks");
            });
    }

    static getSignersByCity(req, res) {
        const { city } = req.params;
        findSignersByCity(city)
            .then(({ rows }) => {
                return res.render("signersByCity", {
                    signers: rows,
                    city,
                    helpers: {
                        capitalize(str) {
                            if (!str) {
                                return "";
                            }
                            return str.slice(0, 1).toUpperCase() + str.slice(1);
                        },
                    },
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }
}

module.exports = PetitionController;
