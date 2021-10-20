import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, followProfile } from '../../redux/actions/profile';
import { AiOutlineCheck, AiOutlineVideoCamera } from 'react-icons/ai';
import { BsFilePost } from 'react-icons/bs';
import { IoMdImages } from 'react-icons/io';
import { FaPassport } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfilePosts from '../../components/Posts/ProfilePosts';

function ProfilePage({ setPostEditor }) {
   const dispatch = useDispatch();
   const { username } = useParams();
   document.title = `Travelog | ${username}`;
   const [selected, setSelected] = useState('posts');
   
   useEffect(() => {
      dispatch(getProfile(username));
   }, [dispatch, username]);

   const user = useSelector(state => state?.auth?.existingUser);
   const profile = useSelector(state => state?.profile);
   const isMyProfile = user._id === profile._id;

   const handleUserFollow = () => {
      dispatch(followProfile(username));
   }

   return (
      <div className="profile-page">
         {profile.username ? (
            <div className="profile">

               <div className="profile-header">

                  <div className="profile-img">
                     <img src={profile?.profileImg?.url} alt="profile" />
                  </div>

                  <div className="profile-name">
                     <h1>{profile.firstName} {profile.lastName}</h1>
                     <h3>@{profile.username}</h3>
                  </div>

                  <div className="follow-stats">
                     {!isMyProfile && <div className="follow-btn stat">
                        <button
                           className={`btn follow-btn ${profile.followers.indexOf(user._id) !== -1 && 'unfollow-btn'}`}
                           onClick={handleUserFollow}>
                           <span>{profile.followers.indexOf(user._id) !== -1 && <AiOutlineCheck />}</span>
                           {profile.followers.indexOf(user._id) !== -1 ? 'Following' : 'Follow'}
                        </button>
                     </div>}
                     <div className="followers-count stat">
                        <h4>Followers</h4>
                        <span>{profile.followers.length}</span>
                     </div>
                     <div className="following-count stat">
                        <h4>Following</h4>
                        <span>{profile.following.length}</span>
                     </div>
                  </div>

                  <div className="bio-container">
                     {isMyProfile && <div className="edit-bio">
                        edit bio
                     </div>}
                     <div className="bio">
                        bio {user.bio}
                     </div>
                  </div>

               </div>

               <div className="profile-content">

                  <div className="profile-nav">
                     <div className="profile-content-type">
                        <div
                         className={`profile-content-option ${selected === 'posts' ? 'selected' : null}`}
                         onClick={() => setSelected('posts')}
                         >
                           <BsFilePost className="content-type-icon" />
                           <span className="content-type">Posts</span>
                        </div>
                        <div
                         className={`profile-content-option ${selected === 'images' ? 'selected' : null}`}
                         onClick={() => setSelected('images')}
                         >
                           <IoMdImages className="content-type-icon" />
                           <span className="content-type">Images</span>
                        </div>
                        <div
                         className={`profile-content-option ${selected === 'videos' ? 'selected' : null}`}
                         onClick={() => setSelected('videos')}
                         >
                           <AiOutlineVideoCamera className="content-type-icon" />
                           <span className="content-type">Videos</span>
                        </div>
                        <div
                         className={`profile-content-option ${selected === 'passport' ? 'selected' : null}`}
                         onClick={() => setSelected('passport')}
                         >
                           <FaPassport className="content-type-icon" />
                           <span className="content-type">Passport</span>
                        </div>
                     </div>
                  </div>

                  <div className="profile-content-container">

                     {selected === 'posts' && <div className="posts-container">
                        <ProfilePosts setPostEditor={setPostEditor} />
                     </div>}

                  </div>

               </div>

            </div>
         ) : <CircularProgress style={{ color: 'var(--orange-1)' }} />}
      </div>
   )
}

export default ProfilePage;
