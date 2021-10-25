import React from 'react';
import './HomePage.css';
import { MdRssFeed, MdTravelExplore } from 'react-icons/md';
import FeedPosts from '../../components/Posts/FeedPosts';
import ExplorePosts from '../../components/Posts/ExplorePosts';

function HomePage({ setPostEditor, explorePosts, setExplorePosts }) {
   document.title = 'Travelog';

   return (
      <div className="home-page">
         <div className="feed-options">
            <div className={!explorePosts ? 'selected-2' : ''} onClick={() => setExplorePosts(false)}>
               <MdRssFeed style={{fontSize: '1.3rem'}} />
               <h3>Feed</h3>
            </div>
            <div className={explorePosts ? 'selected-2' : ''} onClick={() => setExplorePosts(true)}>
               <MdTravelExplore style={{fontSize: '1.3rem'}} />
               <h3>Explore</h3>
            </div>
         </div>

         {explorePosts ?
            <ExplorePosts setPostEditor={setPostEditor} />
            :
            <FeedPosts setPostEditor={setPostEditor} />
         }

      </div>
   )
}

export default HomePage;