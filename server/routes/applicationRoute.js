const express = require("express")
const applicationRoute = express.Router()
const { postApplication, getApplication, updateApplication, deleteApplication } = require("../controllers/applicationController")


applicationRoute.post("/:job_id", postApplication)

applicationRoute.get("/", getApplication)

applicationRoute.patch("/:id", updateApplication)

applicationRoute.delete("/:id", deleteApplication)


module.exports = applicationRoute;