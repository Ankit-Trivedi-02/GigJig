const express = require("express")
const jobRouter = express.Router()
const { postJob } = require("../controllers/jobControllers")


jobRouter.post("/", postJob)

jobRouter.get("/", (req, res) => {
    res.json({ msg: "post jobs easily" })
})
// jobRouter.patch("/:id", editJob)
// jobRouter.delete("/:id", deletejob)
// userRouter.post("/update-profile", updateProfile)

module.exports = jobRouter;