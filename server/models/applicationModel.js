const mongoose = require("mongoose");
const User = require("./userModel")
const job = require("../models/jobModel")

const applicationSchema = new mongoose.Schema({
    title: { 
        type: String, 
        default: "I am interested in this job" 
    },
    description: { 
        type: String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    job: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Job", 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['applied', 'accepted', 'rejected', 'completed'], 
        required: true, 
        default: "applied" 
    },
}, { 
    timestamps: true 
});


const application = mongoose.model("application", applicationSchema)

module.exports = application