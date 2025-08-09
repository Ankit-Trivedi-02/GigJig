const User = require("../models/userModel")

async function getUser(req, res) {
    const email = req.user.email;
    const profile = await User.findOne({ email });
    return res.status(200).json({
        name: {
            firstName: profile.name.firstName,
            lastName: profile.name.lastName
        },
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        location: { country: profile.location.country, state: profile.location.state, address: profile.location.address, cordinates: [profile.location.coordinates] },
        profilePic: profile.profile_image,
        createdAt: profile.createdAt
    })
}

async function updateProfile(req, res) {
    try {
        const { name, email, phone, location: { address, country, state } = {}, } = req.body;
        // Validate required fields
        if (!name?.firstName || !name?.lastName || !email || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                name: {
                    firstName: name.firstName,
                    lastName: name.lastName,
                },
                phone,
                location: {
                    address,
                    country: country || '',
                    state: state || ''
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "No user found" });
        }

        res.status(200).json({ message: "Successfully updated profile" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = { getUser, updateProfile }