const { getUser } = require("../utils/auth")

function checkAuthenticationOfUser(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(400).json({ status: "No Login session" })
        }
        const user = getUser(token);
        if (!user) {
            return res.status(400).json({ status: "No Login session" })
        }
        req.user = user;
        next();
    } catch (err) {
        return res.json({ error: "Server error" });
    }
}

module.exports = { checkAuthenticationOfUser };