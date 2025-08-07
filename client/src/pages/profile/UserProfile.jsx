import React, { useEffect, useState } from "react"
import './UserProfile.css';
import { useNavigate } from "react-router-dom"
import { FaEnvelope } from 'react-icons/fa';
import axios from "axios"
import Navbar from '../../components/navbar/Navbar';

const UserProfile = () => {

  const navigate = useNavigate()
  const [canEdit, setcanEdit] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: { address: '' }
  });

  const getProfileData = async (e) => {
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
    if (profileData.phone.length !== 10) {
      alert("Phone must be of 10 digit")
      return
    }
    if (profileData.location.address.length < 4) {
      alert("please give valid address")
      return
    }
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
      if (name === "firstName") {
        let name = name + value
      }
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

      <aside className="sidebar">
        <div className="icon"></div>
        <div className="icon"></div>
        <div className="icon"></div>
        <div className="icon"></div>
      </aside>

      <main className="main">
        {/* <header className="header">
          <div>
            <h2>Welcome, Amanda</h2>
            <p>Tue, 07 June 2022</p>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <div className="profile-pic"></div>
          </div>
        </header> */}

        <div className="card">

          <div className="card-header"></div>
          <div className="profile-section">
            <img
              src="https://i.pinimg.com/originals/c4/cb/37/c4cb37fb08aaf5c474b66f0d6fa146ce.jpg"
              alt="Alexa"
              className="avatar"
            />
            <div>
              <h3>{profileData.name}</h3>
              <p>{profileData.email}</p>
            </div>
            {canEdit ? <button className="edit-btn" type="submit">Save Changes</button> : <div />}
            <button type="button" className="edit-btn" onClick={() => {
              setcanEdit((prev) => !prev)
            }}>{canEdit ? "Quit" : "Edit"}</button>
          </div>

          <div className="form-section">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" placeholder="Your First Name" value={profileData.name} onChange={handleInputData} readOnly={!canEdit} />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" placeholder="Your Last Name" value={profileData.name} onChange={handleInputData} readOnly={!canEdit} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <input name="phone" placeholder="Phone Number" value={profileData.phone} onChange={handleInputData} readOnly={!canEdit} />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input name="country" placeholder="Country" />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input name="state" placeholder="State" />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input name="address" placeholder="Address" value={profileData.location.address} onChange={handleInputData} readOnly={!canEdit} />
              </div>
            </div>

            <div className="input-row">
              <select name="gender"><option>Gender</option><option>Male</option><option>Female</option><option>Others</option></select>
              <input type="text" value={"Client"} readOnly />
            </div>

            <div className="email-section">
              <h4>My email Address</h4>
              <div className="email-info">
                <FaEnvelope />
                <div>
                  <p>{profileData.email}</p>
                  <small>1 month ago</small>
                </div>
              </div>
              <button className="add-email">+Add Email Address</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
