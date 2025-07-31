const User = require("../models/userModel");

async function registerUser(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const { username, email, password } = req.body;

    const role = "client"
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const isDoubleUserName = await User.findOne({ username })
    if (isDoubleUserName) {
        return res.status(400).json({ error: "User already exists with this username" });
    }
    const isDoubleMail = await User.findOne({ email })
    if (isDoubleMail) {
        return res.status(400).json({ error: "User already exists with this email" });
    }
    let { phone, address, latitude, longitude, profile_image } = req.body;
    phone = phone || null
    profile_image = profile_image || null;
    const location = {
        address: address || null, // Default to null if not provided
        coordinates: (latitude && longitude) ? [longitude, latitude] : null // Default to null if latitude/longitude are not provided
    };
    try {
        const response = await User.create({
            username: username,
            email: email,
            password: password,
            role: role,
            phone: phone,
            location: location,
            profile_image: profile_image
        })
        res.status(201).json({ status: "sucess", user: response })
    } catch (error) {
        console.log({ error: error })
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const loginData = await User.findOne({ email: email });
        if (!loginData) {
            return res.status(404).json({ message: "No user found" })
        }
        if (loginData.password !== password) {
            return res.status(401).json({ status: "Wrong pass-word or email" });
        }
        return res.status(200).json({ status: "success" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to log-in " })
    }

}


module.exports = { registerUser, loginUser };