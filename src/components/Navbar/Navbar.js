import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../images/travelog-logo.png';
import avatar from '../../images/profile-avatar.jpg'
import { CgBell, CgSearch, CgMenu } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiMessages } from 'react-icons/ti';
import Search from '../Search/Search';
import MobileSearch from '../Search/MobileSearch';
import { Link } from 'react-router-dom';
import MobileSidebar from '../Sidebar/MobileSidebar';
import PostEditor from '../Posts/PostEditor/PostEditor';

function Navbar() {
   const [mobileSearch, setMobileSearch] = useState(() => false);
   const [inputFocus, setInputFocus] = useState(() => false);
   const [mobileSidebar, setMobileSidebar] = useState(() => false);
   const [postEditor, setPostEditor] = useState(() => false);

   return (
      <div className="navbar">
         {mobileSearch && <div className="mobile-search-bar">
            <MobileSearch mobileSearch={mobileSearch} setMobileSearch={setMobileSearch} />
         </div>}
         <div className="nav-container">

            <div className="left-nav">
               <div className="ham-menu" onClick={() => setMobileSidebar(true)}>
                  <CgMenu />
               </div>
               {mobileSidebar && <div className="backdrop mobile-sidebar-background" onClick={() => setMobileSidebar(false)}>
                  <MobileSidebar setMobileSidebar={setMobileSidebar} />
               </div>}
               
               <div className="nav-logo">
                  <Link to="/">
                     <img src={logo} alt="logo" />
                  </Link>
               </div>
            </div>

            <div className="mid-nav">
               <Search inputFocus={inputFocus} setInputFocus={setInputFocus} />
            </div>

            <div className="right-nav">

               <div className="profile-avatar">
                  <img src={avatar} alt="profile-avatar" />
               </div>

               <div className="nav-item">
                  <CgBell />
               </div>

               <div className="nav-item">
                  <TiMessages />
               </div>

               <div className="nav-item" onClick={() => setPostEditor(true)}>
                  <AiOutlinePlus />
               </div>
               {postEditor && <PostEditor setPostEditor={setPostEditor} />}

               <div className="nav-item mobile-search-icon" onClick={() => setMobileSearch(() => true)}>
                  <CgSearch />
               </div>

            </div>

         </div>
      </div>
   )
}

export default Navbar;
