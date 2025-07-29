import React from 'react';
import './FeedPage.css';
import Navbar from '../../components/navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PostJob from '../../components/PostJob/PostJob';
import GigFinder from '../../components/GigFinder/GigFinder';

function FeedPage() {
  return (
    <div className="feed-container">
      <Navbar />
      <div className="feed-content">
        <div className="feed-left">
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
