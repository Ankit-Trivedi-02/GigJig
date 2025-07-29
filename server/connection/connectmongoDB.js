const mongoose = require("mongoose");

function connectToMongoDB(link) {
    try {
        mongoose.connect(`${link}/gig-jig`)
            .then(() => { console.log("mongoose connected!"); })
            .catch(err => { console.log("Connection error:", err); });
    } catch (err) {
        console.log("Unexpected error:", err);
    }
}

module.exports = { connectToMongoDB };
