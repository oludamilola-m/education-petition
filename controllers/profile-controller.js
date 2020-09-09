const bc = require("../bc");
const { createProfile, findSignersByCity, getUserProfile } = require("../db");

class ProfileController {
    static getProfileDetails(req, res) {
        res.render("profile");
    }

    static profile(req, res) {
        const { age, city, url } = req.body;
        const { user } = req.session;

        createProfile(age, city, url, user)
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                return res.redirect("/petition");
            })
            .catch((err) => {
                console.log("err: ", err);
                res.redirect("/registration");
            });
    }

    static getSignersByCity(req, res) {
        const { city } = req.params;

        findSignersByCity(city)
            .then(({ rows }) => {
                return res.render("signersByCity", {
                    signers: rows,
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }

    static updateUser(req, res) {
        getUserProfile()
            .then(({ rows }) => {
                console.log("rows with id: ", rows[0].user_id);
                console.log("rows with id: ", rows[0]);

                return res.render("edit-profile", {
                    userInfo: rows[0],
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }

    // static updateUserInfo(req, res) {
    //     console.log("hi");
    //     console.log("result: ", req.body);
    // }
}

module.exports = ProfileController;
