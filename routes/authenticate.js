module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        res.status(500).json("Forbidden.");
    }
    next();
};