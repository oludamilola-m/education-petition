const bc = require("../bc");
const db = require("../db");

class RegistrationController {
    static getSignUp(req, res) {
        res.render("registration");
    }

    static async createUser(req, res) {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bc.hash(password);

        db.createUser(firstName, lastName, email, hashedPassword)
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                req.session.user = rows[0];
                return res.redirect("/profile");
            })
            .catch((err) => {
                console.log("err: ", err);
                res.redirect("/registration");
            });
    }
}

module.exports = RegistrationController;
