const express = require("express")
const userRouter = express.Router()
const { getUser, updateProfile, getUserRole , deleteUser } = require("../controllers/userController")


userRouter.get("/", (req, res) => {
    res.json({ user: "req accepted" })
})
userRouter.get("/profile", getUser)
userRouter.delete("/:id", deleteUser)
userRouter.get("/getUserRole", getUserRole)

userRouter.post("/update-profile", updateProfile)
module.exports = userRouter;