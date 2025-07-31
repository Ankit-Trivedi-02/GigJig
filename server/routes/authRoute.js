const express = require("express");
const authRouter = express.Router();
const { registerUser, loginUser } = require("../controllers/authController")

authRouter.post("/client/register", registerUser)

authRouter.post("/client/login", loginUser)

module.exports = authRouter;