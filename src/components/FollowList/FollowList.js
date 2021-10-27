import React, { useEffect } from 'react';
import './FollowList.css';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { clearFollowList, getFollowers, getFollowing } from '../../redux/actions/followList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

function FollowList({ title, setFollowList, username }) {
   const dispatch = useDispatch();

   useEffect(() => {
      if (title === 'Followers') {
         dispatch(getFollowers(username));
      } else {
         dispatch(getFollowing(username));
      }
   }, [dispatch, title, username])

   const { followers, following } = useSelector(state => state.followList);

   const closeFollowList = () => {
      setFollowList('');
      dispatch(clearFollowList());
   }

   return (
      <div className="backdrop follow-list-backdrop" onClick={closeFollowList}>
         <div className="follow-list-container" onClick={e => e.stopPropagation()}>
            <div className="follow-list-header">
               <h3>{title}</h3>
               <div className="nav-item error-popup-close-icon" onClick={closeFollowList}>
                  <CgClose />
               </div>
            </div>
            <div className="follow-list-body">
               {title === 'Followers' ?
                  followers.length ?
                     followers.map(user => {
                        return (
                           <Link className="user-preview" key={user.username} to={`/${user.username}`} onClick={closeFollowList}>
                              <img src={user.profileImg.url} alt="profile" />
                              <h4>{user.username}</h4>
                           </Link>
                        )
                     })
                     :
                     <CircularProgress style={{ color: 'var(--orange-1)' }} />
                  :
                  following.length ?
                     following.map(user => {
                        return (
                           <Link className="user-preview" key={user.username} to={`/${user.username}`} onClick={closeFollowList}>
                              <img src={user.profileImg.url} alt="profile" />
                              <h4>{user.username}</h4>
                           </Link>
                        )
                     })
                     :
                     <CircularProgress style={{ color: 'var(--orange-1)' }} />
               }
            </div>
         </div>
      </div>
   )
}

export default FollowList;
