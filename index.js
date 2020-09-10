const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const handlebars = require("express-handlebars");
const router = require("./routers");
const { authenticate } = require("./middlewares/auth-middleware");

const profileRouter = require("./routers/profile-router");
const authRouter = require("./routers/auth-router");

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
    res.locals.csrfToken = req.csrfToken();
    res.locals.isLoggedIn = !!req.session.userId;
    next();
});

app.use("/profile", profileRouter);
app.use("/", authRouter);
app.use(router);

app.listen(process.env.PORT || 8080, () =>
    console.log("petition server running")
);
