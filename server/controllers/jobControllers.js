const job = require("../models/jobModel");

async function postJob(req, res) {
    console.log(req.body)
    if (!req.body) {
        return res.status(401).json({ error: "Must provide required data" });
    }
    const { title, specification, category, description, penny, dueDate } = req.body;
    console.log(req.user._id)
    if (!title || !specification || !category || !penny || !req.user._id) {
        return res.status(401).json({ error: "Must provide required data" });
    }
    try {
        const postedJob = await job.create({ title, specification, category, description, penny, dueDate, user: req.user._id })
        res.status(201).json({ sucess: "Your job is posted", title: postedJob.title, description: description })
    } catch (err) {
        res.json({ error: "Error registering your task" })
    }
}

async function getAllJobs(req, res) {
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

async function getJob(req, res) {
    const _id = req.params.id;
    const user = req.user?._id;

    if (!user) {
        return res.status(401).json({ message: "You need to login to access" });
    }

    try {
        const currentJob = await job.findOne({ _id, user });

        if (!currentJob) {
            return res.status(404).json({ message: "Job not found or not owned by user" });
        }

        return res.status(200).json({ job: currentJob });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateJob(req, res) {
    const _id = req.params.id;
    const user = req.user?._id;

    if (!user) {
        return res.status(401).json({ message: "You need to login to access" });
    }

    const { title, specification, category, description, penny, dueDate } = req.body;

    try {
        const currentJob = await job.findOneAndUpdate(
            { _id, user }, 
            { title, specification, category, description, penny, dueDate }, 
            { new: true } 
        );

        if (!currentJob) {
            return res.status(404).json({ message: "Job not found or not owned by user" });
        }

        return res.status(200).json({ job: currentJob });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { postJob, getAllJobs, getJob, updateJob };