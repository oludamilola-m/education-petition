const authenticate = (req, res, next) => {
    if (!isLoggedIn(req) && isProtectedPath(req.path)) {
        res.redirect("/registration");
    } else {
        next();
    }
};

const isLoggedIn = (req) => {
    return !!req.session.user;
};

const isProtectedPath = (path) => {
    const PROTECTED_PATHS = [
        "/thanks",
        "/signers",
        "/petition",
        "/profile/edit",
        "/profile",
    ];
    return PROTECTED_PATHS.includes(path);
};

const ensureLoggedIn = (req, res) => {
    if (!isLoggedIn(req)) {
        res.redirect("/registration");
    } else {
        next();
    }
};

module.exports = {
    authenticate,
    ensureLoggedIn,
};
