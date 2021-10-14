import React from 'react';
import './Dropdowns.css';
import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';

function ProfileDropdown({ setProfileDropdown }) {
   const dispatch = useDispatch();
   const history = useHistory();

   const handleLogout = () => {
      setProfileDropdown(false);
      dispatch(logout(history));
   }

   return (
      <div className="dropdown" onClick={e => e.stopPropagation()}>

         <Link to="/" className="dropdown-link" onClick={() => setProfileDropdown(false)}>
            <CgProfile className="dropdown-icon" />
            <h3>Profile</h3>
         </Link>

         <div className="dropdown-link" onClick={handleLogout}>
            <RiLogoutCircleRLine className="dropdown-icon" />
            <h3>Logout</h3>
         </div>
         
      </div>
   )
}

export default ProfileDropdown;
