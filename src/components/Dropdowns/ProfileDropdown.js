import React from 'react';
import './Dropdowns.css';
import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';

function ProfileDropdown({ setProfileDropdown }) {
   const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector(state => state?.auth?.existingUser);

   const handleLogout = () => {
      setProfileDropdown(false);
      dispatch(logout(history));
   }

   return (
      <div className="dropdown" onClick={e => e.stopPropagation()}>

         <Link to={`/${user.username}`} className="dropdown-link" onClick={() => setProfileDropdown(false)}>
            <CgProfile className="dropdown-icon" />
            <h3>{user.username}</h3>
         </Link>

         <div className="dropdown-link" onClick={handleLogout}>
            <RiLogoutCircleRLine className="dropdown-icon" />
            <h3>Logout</h3>
         </div>
         
      </div>
   )
}

export default ProfileDropdown;
