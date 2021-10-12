import React from 'react';
import './navbar.css';
import logo from '../../images/travelog-logo.png';
import avatar from '../../images/profile-avatar.jpg'
import { CgBell } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';

function Navbar() {
   return (
      <div className="navbar">
         <div className="nav-container">

            <div className="left-nav">
               <div className="nav-logo">
                  <img src={logo} alt="logo" />
               </div>
            </div>

            <div className="mid-nav">
               M
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
            </div>

         </div>
      </div>
   )
}

export default Navbar;
