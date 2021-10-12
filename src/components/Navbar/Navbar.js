import React, { useState } from 'react';
import './navbar.css';
import logo from '../../images/travelog-logo.png';
import avatar from '../../images/profile-avatar.jpg'
import { CgBell, CgSearch } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';
import Search from '../Search/Search';
import MobileSearch from '../Search/MobileSearch';

function Navbar() {
   const [mobileSearch, setMobileSearch] = useState(() => false);
   const [inputFocus, setInputFocus] = useState(() => false);

   return (
      <div className="navbar">
         {mobileSearch && <div className="mobile-search-bar">
            <MobileSearch mobileSearch={mobileSearch} setMobileSearch={setMobileSearch} />
         </div>}
         <div className="nav-container">

            <div className="left-nav">
               <div className="nav-logo">
                  <img src={logo} alt="logo" />
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
                  <AiOutlinePlus />
               </div>
               <div className="nav-item mobile-search-icon" onClick={() => setMobileSearch(() => true)}>
                  <CgSearch />
               </div>
            </div>

         </div>
      </div>
   )
}

export default Navbar;
