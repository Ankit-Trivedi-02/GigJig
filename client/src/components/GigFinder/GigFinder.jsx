import React, { useState } from 'react';
import './GigFinder.css';

const dummyProfiles = [
  { name: 'Alice', job: 'Web Developer', img: 'https://i.pinimg.com/originals/c4/cb/37/c4cb37fb08aaf5c474b66f0d6fa146ce.jpg' },
  { name: 'Bob', job: 'Graphic Designer', img: 'https://i.pinimg.com/736x/62/48/c9/6248c9e47b7197b8ccb2987febaf093b.jpg' },
  { name: 'Charlie', job: 'SEO Specialist', img: 'https://i.pinimg.com/474x/bd/2b/3e/bd2b3eb5f897b1ffc023ae47c003d318.jpg' }
];

function GigFinder() {
  const [visible, setVisible] = useState(2);

  return (
    <div className="gig-finder">
      <h2>Gig Finder</h2>
      {dummyProfiles.slice(0, visible).map((profile, idx) => (
        <div key={idx} className="gig-profile">
          <img src={profile.img} alt={profile.name} />
          <div>
            <h4>{profile.name}</h4>
            <p>{profile.job}</p>
          </div>
        </div>
      ))}
      {visible < dummyProfiles.length && (
        <button onClick={() => setVisible(visible + 1)} className="show-more">
          Show More
        </button>
      )}
    </div>
  );
}

export default GigFinder;
