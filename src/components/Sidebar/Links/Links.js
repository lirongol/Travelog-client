import React from 'react';
import './Links.css';
import { MdRssFeed } from 'react-icons/md';
import { RiHashtag } from 'react-icons/ri';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Links() {
   return (
      <>
         <Link to="/" className="sidebar-link">
            <MdRssFeed className="sidebar-icon" />
            <h3>Feed</h3>
         </Link>

         <Link to="/videos" className="sidebar-link">
            <AiOutlineVideoCamera className="sidebar-icon" />
            <h3>Videos</h3>
         </Link>

         <Link to="/tags" className="sidebar-link">
            <RiHashtag className="sidebar-icon" />
            <h3>Tags</h3>
         </Link>
      </>
   )
}

export default Links;
