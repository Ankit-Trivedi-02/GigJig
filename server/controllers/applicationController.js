const application = require("../models/applicationModel")


// function to post an application

async function postApplication(req, res) {
    const job = req.params.job_id;
    if (!job) {
        return res.status(401).json({ error: "Must provide required data" });
    }
    const user = req.user._id;
    if (!user) {
        return res.status(401).json({ error: "Must provide required data" });
    }
    try {
        const duplicateApplication = await application.findOne({ user, job })
        if (duplicateApplication) {
            return res.status(401).json({ error: "cannot make more than one application in a specefic job" });
        }
    } catch (error) {
        return res.status(401).json({ error: "Internal data conflict" });
    }
    const { title, description } = req.body;
    try {
        const postedApplication = await application.create({ title, description, job: job, user: user })
        res.status(201).json({ sucess: "Your application is posted", postedApplication })
    } catch (error) {
        res.json({ error: "Error registering your task" })
    }
}



// function to get all application made by user

async function getApplication(req, res) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: "Login is required" });
    }
    try {
        const applications = await application.find({ user })
        return res.status(200).json(applications)
    } catch (error) {
        return res.status(401).json({ error: "Error" });
    }
}



// function to update data of a specific application 

async function updateApplication(req, res) {
    const _id = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedApplication = await application.findByIdAndUpdate(_id, { title, description }, { new: true });

        if (!updatedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }

        return res.status(200).json(updatedApplication);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// function to delete a application

async function deleteApplication(req, res) {
    const id = req.params.id;

    try {
        const deletedApplication = await application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }

        return res.status(200).json({ status: "success", deletedApplication });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



module.exports = { postApplication, getApplication, updateApplication, deleteApplication }