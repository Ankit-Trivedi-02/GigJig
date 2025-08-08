const job = require("../models/jobModel")

async function postJob(req, res) {
    if (!req.body) {
        return res.status(401).json({ error: "Must provide required data" });
    }
    const { title, specification, categeory, description, penny, dueDate } = req.body;
    if (!title || !specification || !categeory || !penny || !req.user._id) {
        return res.status(401).json({ error: "Must provide required data" });
    }
    try {
        const postedJob = await job.create({ title, specification, categeory, description, penny, dueDate, user: req.user._id })
        res.status(201).json({ sucess: "Your job is posted", title: postedJob.title, description: description })
    } catch (err) {
        res.json({ error: "Error registering your task" })
    }
}

async function getJobs(req, res) {
    if (!req.user) {
        console.log(req.user)
        return res.status(401).json({ error: "You are not signed - in" });
    }
    const id = req.user._id;
    try {
        const postedJobs = await job.find({ user: id })
        res.status(201).json({ job: postedJobs })
    } catch (err) {
        res.json({ error: "Error registering your task" })
    }
}

module.exports = { postJob, getJobs };