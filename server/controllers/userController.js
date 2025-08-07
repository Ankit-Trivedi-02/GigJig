const User = require("../models/userModel")

async function getUser(req, res) {
    const email = req.user.email;
    const profile = await User.findOne({ email });
    return res.status(200).json({
        name: profile.username,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        location: { address: profile.location.address, cordinates: [profile.location.coordinates] },
        profilePic: profile.profile_image,
        createdAt: profile.createdAt
    })
}

async function updateProfile(req, res) {
    try {
        console.log(req.body);

        const { name, email, phone, location: { address } } = req.body;
        console.log(name)
        console.log(email)
        console.log(phone)
        console.log(address)

        if (!name || !email || !phone || !address) {
            console.log("err 1")
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                username: name,
                phone,
                location: { address }
            },
            { new: true } // return the updated document
        );

        if (!updatedUser) {
            console.log("err 2")
            return res.status(404).json({ message: "No user found" });
        }
        res.status(200).json({ message: "Successfully updated profile", user: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = { getUser, updateProfile }