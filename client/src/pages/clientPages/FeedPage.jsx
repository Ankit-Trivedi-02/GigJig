import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedPage.css';
import Navbar from '../../components/navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PostJob from '../../components/PostJob/PostJob';
import GigFinder from '../../components/GigFinder/GigFinder';



function FeedPage() {
  const navigate = useNavigate()

  const redirectRoute = () => {
    navigate("/profile")
  }

  return (
    <div className="feed-container">
      <Navbar />
      <div className="feed-content">
        <div className="feed-left" onClick={redirectRoute} >
          <ProfileCard />
        </div>
        <div className="feed-right">
          <PostJob />
          <GigFinder />
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
