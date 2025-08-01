const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,

    },
    role: {
        type: String,
        enum: ['client', 'contractor', 'partner'],
        required: true,
    },
    location: {
        address: String,
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere',
        }
    },
    profile_image: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

module.exports = User;
