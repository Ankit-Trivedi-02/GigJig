import React, { useState } from 'react';
import './GigFinder.css';

const dummyProfiles = [
  { name: 'Alice', job: 'Web Developer', img: 'https://via.placeholder.com/50' },
  { name: 'Bob', job: 'Graphic Designer', img: 'https://via.placeholder.com/50' },
  { name: 'Charlie', job: 'SEO Specialist', img: 'https://via.placeholder.com/50' }
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
