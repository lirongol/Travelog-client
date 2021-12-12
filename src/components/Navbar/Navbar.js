import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../images/travelog-logo.png';
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
import { useSelector } from 'react-redux';

function Navbar({
   setProfileDropdown,
   profileDropdown,
   notificationDropdown,
   setNotificationDropdown,
   setPostEditor,
   postEditor,
   setInputFocus,
   inputFocus,
   mobileSearch,
   setMobileSearch
}) {
   const [mobileSidebar, setMobileSidebar] = useState(() => false);
   const user = useSelector(state => state?.auth?.existingUser);

   return (
      <div className="navbar">
         {mobileSearch && <div className="mobile-search-bar">
            <MobileSearch
               mobileSearch={mobileSearch}
               setMobileSearch={setMobileSearch}
               setInputFocus={setInputFocus}
            />
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
               <Search
                  inputFocus={inputFocus}
                  setInputFocus={setInputFocus}
                  setNotificationDropdown={setNotificationDropdown}
                  setProfileDropdown={setProfileDropdown}
               />
            </div>

            <div className="right-nav">

               <div
                  className="profile-avatar"
                  onClick={e => {
                     e.stopPropagation();
                     setProfileDropdown(pre => !pre);
                     setNotificationDropdown(false);
                     setInputFocus(false);
                  }}
               >
                  <img src={user?.profileImg?.url} style={profileDropdown ? {border: '1px solid var(--orange-1)'} : null} alt="profile-avatar" />
               </div>
               {profileDropdown && <ProfileDropdown setProfileDropdown={setProfileDropdown} />}

               <div
                  className="nav-item"
                  onClick={e => {
                     e.stopPropagation();
                     setNotificationDropdown(pre => !pre)
                     setProfileDropdown(false);
                     setInputFocus(false);
                  }}
               >
                  <CgBell style={notificationDropdown ? {color: 'var(--orange-1)'} : null} />
               </div>
               {notificationDropdown && <NotificationDropdown />}

               <Link to="/messages" className="nav-item">
                  <TiMessages />
               </Link>

               <div className="nav-item" onClick={() => setPostEditor(true)}>
                  <AiOutlinePlus />
               </div>
               {postEditor && <PostEditor setPostEditor={setPostEditor} />}

               <div className="nav-item mobile-search-icon" onClick={e => { e.stopPropagation(); setMobileSearch(true)}}>
                  <CgSearch />
               </div>

            </div>

         </div>
      </div>
   )
}

export default Navbar;
