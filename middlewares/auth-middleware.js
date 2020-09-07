const authenticate = (req, res, next) => {
    const PROTECTED_PATHS = ["/thanks", "/signers", "/petition"];

    if (!isLoggedIn(req) && PROTECTED_PATHS.includes(req.path)) {
        res.redirect("/registration");
    } else {
        next();
    }
};

const isLoggedIn = (req) => {
    return !!req.session.user;
};

module.exports = {
    authenticate,
};
