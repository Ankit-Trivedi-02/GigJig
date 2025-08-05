import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./clientProfile.css"
import axios from "axios"

function Profile() {
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        location: { address: '' }
    });

    const getProfileData = async () => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.get("http://localhost:3000/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            const data = result.data;

            if (!data) {
                console.log("No user found");
                return;
            }
            setProfileData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                location: {
                    address: data.location?.address || ''
                }
            });
        } catch (err) {
            console.log("Error ", err);
        }
    };

    const updateProfileData = async () => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.post("http://localhost:3000/user/update-profile", profileData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
        } catch (err) {
            console.log({ errpr: err })
        }
    }

    const handleInputData = (e) => {
        const { name, value } = e.target;

        if (name === "address") {
            setProfileData(prevState => ({
                ...prevState,
                location: {
                    ...prevState.location,
                    address: value
                }
            }));
        } else {
            setProfileData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }


    useEffect(() => {
        getProfileData(); // ✅ call the function
    }, []);

    return (
        <div className="container">

            <form onSubmit={updateProfileData} className="profile">

                {/* Close Button */}
                <button className="close-button" onClick={() => navigate("/feed")}>
                    &times;
                </button>

                <div className="profile-img">
                    <img
                        src="https://i.pinimg.com/originals/c4/cb/37/c4cb37fb08aaf5c474b66f0d6fa146ce.jpg"
                        alt="logo"
                    />

                    <input type="file" id="fileInput" className="hidden-file-input" />
                    <label htmlFor="fileInput" className="file-label">
                        Choose New Photo
                    </label>
                </div>

                <div className="profile-data">
                    <input type="text" name="name" placeholder="Name" value={profileData.name} onChange={handleInputData} />
                    <input type="email" name="email" placeholder="Email" value={profileData.email} onChange={handleInputData} />
                    <input type="number" name="phone" placeholder="Phone Number" value={profileData.phone} onChange={handleInputData} />
                    <input type="text" name="address" placeholder="Address" value={profileData.location.address} onChange={handleInputData} />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default Profile
