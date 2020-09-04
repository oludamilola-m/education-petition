const authenticate = (req, res, next) => {
    const PROTECTED_PATHS = ["/thanks", "/signers"];
    if (!req.session.signatoryId && PROTECTED_PATHS.includes(req.path)) {
        res.redirect("/petition");
    } else {
        next();
    }
};

module.exports = {
    authenticate,
};
