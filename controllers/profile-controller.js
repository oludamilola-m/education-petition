const bc = require("../bc");
const { createProfile } = require("../db");

class ProfileController {
    static getProfileDetails(req, res) {
        res.render("profile");
    }

    static profile(req, res) {
        const { age, city, url } = req.body;
        const { user } = req.session;
        console.log("age: ", age);
        console.log("city: ", city);
        console.log("homepage: ", url);

        createProfile(age, city, url, user)
            .then(({ rows }) => {
                console.log(rows);
                req.session.userId = rows[0].id;
                console.log("req.session.userId: ", req.session.userId);
                // req.session.user = rows[0];
                return res.redirect("/petition");
            })
            .catch((err) => {
                console.log("err: ", err);
                res.redirect("/registration");
            });
    }
}

module.exports = ProfileController;
