const express = require("express")
const userRouter = express.Router()
const { getUser, updateProfile } = require("../controllers/userController")


userRouter.get("/", (req, res) => {
    res.json({ user: "req accepted" })
})
userRouter.get("/profile", getUser)

userRouter.post("/update-profile", updateProfile)
module.exports = userRouter;