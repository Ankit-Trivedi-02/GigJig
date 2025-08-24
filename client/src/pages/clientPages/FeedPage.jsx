import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeedPage.css';

import Navbar from '../../components/navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PostJob from '../../components/PostJob/GoToPostJobButton.jsx';
import GigFinder from '../../components/GigFinder/GigFinder';
import UserJobs from '../../components/UserJobs/UserJobs';


function ClientFeedPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const result = await axios.get("http://localhost:3000/user/getUserRole", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        const userRole = result.data;
        setRole(userRole);
      } catch (err) {
        console.error('Failed to fetch user role:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  // const role = 'client';

  const redirectRoute = () => {
    navigate('/profile');
  };

  if (role === 'partner') {
    return (
      <div className="feed-container">
        <Navbar />
        <div className="feed-content">
          <div className="feed-left">
            <ProfileCard onClick={redirectRoute} />
          </div>
          <div className="feed-right">
            <UserJobs role={role} />
          </div>
        </div>
      </div>
    );
  }

  //  for client
  return (
    <div className="feed-container">
      <Navbar />
      <div className="feed-content">
        <div className="feed-left">
          <ProfileCard onClick={redirectRoute} />
          <GigFinder />
        </div>
        <div className="feed-right">
          <PostJob />
          <UserJobs />
        </div>
      </div>
    </div>
  );
}

export default ClientFeedPage;
