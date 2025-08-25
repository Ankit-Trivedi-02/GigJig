const express = require("express")
const jobRouter = express.Router()
const { postJob, getAllJobs, getJob, updateJob } = require("../controllers/jobControllers")


jobRouter.post("/", postJob)

jobRouter.get("/", getAllJobs)

jobRouter.get("/:id", getJob)

jobRouter.patch("/:id", updateJob)

// jobRouter.delete("/:id", deletejob)
// userRouter.post("/update-profile", updateProfile)

module.exports = jobRouter;