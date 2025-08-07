const mongoose = require("mongoose");
const User = require("./userModel")

const jobSchema = new mongoose.Schema({
    title: { type: String, require: true },
    specification: { type: String, require: true },
    categeory: { type: String, require: true },
    description: { type: String },
    penny: { type: Number, require: true },
    dueDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    isJobAssigned: { type: Boolean, default: false, require: true },
    partner: { type: String }
}, { timestamps: true })

const job = mongoose.model("Job", jobSchema)

module.exports = job