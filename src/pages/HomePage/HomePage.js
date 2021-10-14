import React, { useState } from 'react';
import './HomePage.css';
import { MdRssFeed, MdTravelExplore } from 'react-icons/md';

function HomePage() {
   const [explore, setExplore] = useState(() => false)

   return (
      <div className="home-page">
         <div className="feed-options">
            <div className={!explore ? 'selected-2' : ''} onClick={() => setExplore(false)}>
               <MdRssFeed style={{fontSize: '1.3rem'}} />
               <h3>Feed</h3>
            </div>
            <div className={explore ? 'selected-2' : ''} onClick={() => setExplore(true)}>
               <MdTravelExplore style={{fontSize: '1.3rem'}} />
               <h3>Explore</h3>
            </div>
         </div>
      </div>
   )
}

export default HomePage;