const jwt = require("jsonwebtoken")
require("dotenv").config({ path: '../server/.env' });
const secret = "secreatKey" || process.env.JWT_SECRET;

function setUser(user) {
    return jwt.sign(user, secret)
}

function getUser(token) {
    if (!token) {
        return null
    }
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return err;
    }
}

module.exports = { setUser, getUser }