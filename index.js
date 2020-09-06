const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const handlebars = require("express-handlebars");
const PetitionController = require("./controllers/petition-controller");
const { authenticate } = require("./middlewares/auth-middleware");
require("dotenv").config();

app.set("view engine", "hbs");
app.engine("hbs", handlebars({ defaultLayout: "main", extname: ".hbs" }));

app.use(express.static("./public"));

// Allows us to access form data from post request in req.body
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        secret: process.env.COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(csurf());

app.use(authenticate);

app.use(function (req, res, next) {
    //prevent clickjacking
    res.setHeader("x-frame-options", "deny");
    next();
});

app.get("/", (req, res) => {
    res.redirect("/petition");
});

app.get("/petition", PetitionController.home);

app.post("/petition", PetitionController.createPetition);

app.get("/thanks", PetitionController.thanks);

app.get("/signers", PetitionController.getAllSignatories);

app.listen(8080, () => console.log("petition server running"));
