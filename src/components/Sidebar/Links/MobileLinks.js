import React from 'react';
import './Links.css';
import { MdRssFeed } from 'react-icons/md';
import { RiHashtag } from 'react-icons/ri';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function MobileLinks({ setMobileSidebar }) {
   return (
      <>
         <Link to="/" className="sidebar-link" onClick={() => setMobileSidebar(false)}>
            <MdRssFeed className="sidebar-icon" />
            <h3>Feed</h3>
         </Link>

         <Link to="/videos" className="sidebar-link" onClick={() => setMobileSidebar(false)}>
            <AiOutlineVideoCamera className="sidebar-icon" />
            <h3>Videos</h3>
         </Link>

         <Link to="/tags" className="sidebar-link" onClick={() => setMobileSidebar(false)}>
            <RiHashtag className="sidebar-icon" />
            <h3>Tags</h3>
         </Link>
      </>
   )
}

export default MobileLinks;
