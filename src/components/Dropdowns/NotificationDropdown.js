import React from 'react';
import './Dropdowns.css';
import { RiUserFollowLine } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import { MdPostAdd } from 'react-icons/md';

function NotificationDropdown() {
   return (
      <div className="dropdown notification" onClick={e => e.stopPropagation()}>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <BiCommentDetail className="dropdown-icon" />
            <h3>someone commented on yout post</h3>
         </div>

         <div className="dropdown-link">
            <MdPostAdd className="dropdown-icon" />
            <h3>someone added a new post</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

         <div className="dropdown-link">
            <RiUserFollowLine className="dropdown-icon" />
            <h3>someone started following you</h3>
         </div>

      </div>
   )
}

export default NotificationDropdown;
