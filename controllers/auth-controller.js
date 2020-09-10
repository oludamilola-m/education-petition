const { findUserByEmail, getSignature } = require("../db");
const bc = require("../bc");

class AuthController {
    static getLogIn(req, res) {
        const error = req.session.error;
        req.session.error = null;
        res.render("login", { error });
    }

    static login(req, res) {
        const { email, password } = req.body;
        findUserByEmail(email)
            .then(({ rows }) => {
                const user = rows[0];

                bc.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            req.session.userId = user.id;
                            req.session.user = user;

                            getSignature(user.id).then(({ rows }) => {
                                if (rows.length > 0) {
                                    return res.redirect("/thanks");
                                } else {
                                    res.redirect("/petition");
                                }
                            });

                            res.redirect("/petition");
                        } else {
                            req.session.error = "invalid email/password";
                            res.redirect("/login");
                        }
                    })
                    .catch(() => {
                        req.session.error = "invalid email/password";
                        res.redirect("/login");
                    });
            })
            .catch(() => {
                req.session.error = "invalid email/password";
                res.redirect("/login");
            });
    }

    static logout(req, res) {
        req.session.userId = null;
        req.session.user = null;
        res.redirect("/login");
    }
}

module.exports = AuthController;
