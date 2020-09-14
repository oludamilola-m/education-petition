const bc = require("../bc");
const isValidUrl = require("../utilities/url-validator");

const {
  createProfile,
  findSignersByCity,
  getUserProfile,
  getProfile,
  ...db
} = require("../db");

class ProfileController {
  static getProfileDetails(req, res) {
    getProfile(req.session.user.id)
      .then(({ rows }) => {
        res.locals.userProfile = rows[0];
        return res.render("profile");
      })
      .catch((err) => {
        res.render("profile");
      });
  }

  static createUserProfile(req, res) {
    const { age, city, url } = req.body;
    const { user } = req.session;

    if (url !== "" && !isValidUrl(url)) {
      req.flash("error", "Invalid url");
      return res.redirect("/profile");
    }
    const formattedAge = age === "" ? null : age;
    createProfile(formattedAge, city, url, user)
      .then(() => {
        return res.redirect("/petition");
      })
      .catch((err) => {
        console.log("err: ", err);
        res.redirect("/profile");
      });
  }

  static updateUser(req, res) {
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
    const { firstName, lastName, email, password, age, city, url } = req.body;

    if (url !== "" && !isValidUrl(url)) {
      req.flash("error", "Invalid url");
      return res.redirect("/profile/edit");
    }

    const formattedAge = age === "" ? null : age;
    db.updateProfile(formattedAge, city, url, userId)
      .then(() => {
        if (password === "") {
          db.updateUser(firstName, lastName, email, userId)
            .then(() => {
              return res.redirect("/profile");
            })
            .catch((err) => {
              req.flash("error", "Could not update profile");
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
