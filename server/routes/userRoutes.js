const express = require("express")
const userRouter = express.Router()
const { getUser } = require("../controllers/userController")


userRouter.get("/", (req, res) => {
    res.json({ user: "req accepted" })
})
userRouter.get("/:user", getUser)
module.exports = userRouter;