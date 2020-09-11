const bc = require("../bc");
const {
    createProfile,
    findSignersByCity,
    getUserProfile,
    ...db
} = require("../db");

class ProfileController {
    static getProfileDetails(req, res) {
        getUserProfile(req.session.user.id)
            .then(({ rows }) => {
                res.locals.userProfile = rows[0];
                res.render("profile");
            })
            .catch((err) => {
                res.render("profile");
            });
    }

    static profile(req, res) {
        const { age, city, url } = req.body;
        const { user } = req.session;

        createProfile(age, city, url, user)
            .then(({ rows }) => {
                return res.redirect("/petition");
            })
            .catch((err) => {
                console.log("err: ", err);
                res.redirect("/registration");
            });
    }

    static updateUser(req, res) {
        const error = req.session.error;
        req.session.error = null;
        res.locals.error = error;
        getUserProfile(req.session.user.id)
            .then(({ rows }) => {
                res.render("edit-profile", {
                    userInfo: rows[0],
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }

    static updateUserInfo(req, res) {
        const userId = req.session.user.id;
        const {
            firstName,
            lastName,
            email,
            password,
            age,
            city,
            url,
        } = req.body;
        db.updateProfile(age, city, url, userId)
            .then(() => {
                if (password === "") {
                    db.updateUser(firstName, lastName, email, userId)
                        .then(() => {
                            return res.redirect("/thanks");
                        })
                        .catch((err) => {
                            console.log(err);
                            req.session.error = "Could not update profile";
                            res.redirect("/profile/edit");
                        });
                } else {
                    bc.hash(password).then((hashedPassword) => {
                        db.updateUserWithPassword(
                            firstName,
                            lastName,
                            email,
                            hashedPassword,
                            req.session.user.id
                        )
                            .then(() => {
                                return res.redirect("/thanks");
                            })
                            .catch((err) => {
                                console.log(err);
                                req.session.error = "Could not update profile";
                                res.redirect("/profile/edit");
                            });
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                req.session.error = "Could not update profile";
                res.redirect("/profile/edit");
            });
    }
}

module.exports = ProfileController;
