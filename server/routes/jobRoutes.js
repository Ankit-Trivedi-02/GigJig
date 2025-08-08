const express = require("express")
const jobRouter = express.Router()
const { postJob, getJobs } = require("../controllers/jobControllers")


jobRouter.post("/", postJob)

jobRouter.get("/", getJobs)
// jobRouter.patch("/:id", editJob)
// jobRouter.delete("/:id", deletejob)
// userRouter.post("/update-profile", updateProfile)

module.exports = jobRouter;