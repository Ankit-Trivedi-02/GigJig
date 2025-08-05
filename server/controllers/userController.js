function getUser(req, res) {
    return res.status(200).json({
        name: "Ankit Trivedi",
        email: "rum2425515@ramauniversity.ac.in",
        phone: 9026820358,
        role: "client",
        location: { address: "Jarauli phase 2", cordinates: [30, 40] },
        profilePic: "No pic",
        createdAt: Date.now()
    })
}


module.exports = { getUser }