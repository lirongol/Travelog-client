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
import ProfileDropdown from '../Dropdowns/ProfileDropdown';
import NotificationDropdown from '../Dropdowns/NotificationDropdown';

function Navbar({ setProfileDropdown, profileDropdown, notificationDropdown, setNotificationDropdown }) {
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

               <div
                  className="profile-avatar"
                  onClick={e => {
                     e.stopPropagation();
                     setProfileDropdown(pre => !pre);
                     setNotificationDropdown(false);
                  }}
               >
                  <img src={avatar} style={profileDropdown ? {border: '2px solid var(--orange-1)'} : null} alt="profile-avatar" />
               </div>
               {profileDropdown && <ProfileDropdown setProfileDropdown={setProfileDropdown} />}

               <div
                  className="nav-item"
                  onClick={e => {
                     e.stopPropagation();
                     setNotificationDropdown(pre => !pre)
                     setProfileDropdown(false);
                  }}
               >
                  <CgBell style={notificationDropdown ? {color: 'var(--orange-1)'} : null} />
               </div>
               {notificationDropdown && <NotificationDropdown />}

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
