import React from "react"
import { useNavigate } from "react-router-dom"
import "./clientProfile.css"

function Profile() {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="profile">

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
                    <input type="text" name="name" placeholder="Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="number" name="phone" placeholder="Phone Number" />
                    <input type="text" name="address" placeholder="Address" />
                </div>

                <button>Save Changes</button>
            </div>
        </div>
    )
}

export default Profile
