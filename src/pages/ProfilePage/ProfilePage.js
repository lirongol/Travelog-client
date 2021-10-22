import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, followProfile, updateBio } from '../../redux/actions/profile';
import { AiOutlineCheck, AiOutlineVideoCamera } from 'react-icons/ai';
import { BsFilePost } from 'react-icons/bs';
import { IoMdImages } from 'react-icons/io';
import { FaPassport } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfilePosts from '../../components/Posts/ProfilePosts';
import { Redirect } from 'react-router-dom';

function ProfilePage({ setPostEditor }) {
   const dispatch = useDispatch();
   const { username } = useParams();
   document.title = `Travelog | ${username}`;
   const [selected, setSelected] = useState('posts');
   const [editBio, setEditBio] = useState(false);
   const [bio, setBio] = useState('');
   const [bioError, setBioError] = useState('');

   const user = useSelector(state => state?.auth?.existingUser);
   const profile = useSelector(state => state?.profile);
   const getProfileError = useSelector(state => state.error.getProfileError);
   const isMyProfile = user._id === profile._id;

   useEffect(() => {
      dispatch(getProfile(username));
   }, [dispatch, username]);

   const handleUserFollow = () => {
      dispatch(followProfile(username));
   }

   const handleOpenBioEditor = () => {
      setEditBio(pre => !pre);
      setBio(profile.bio);
      setBioError('');
   }

   const handleEditBioSubmit = e => {
      e.preventDefault();
      if (bio.length > 100) {
         setBioError('bio cant be more then 100 characters');
      } else if (bio.split('\n').length > 10) {
         setBioError('bio cant be more then 10 lines');
      } else {
         dispatch(updateBio(bio));
         setBioError('');
         setEditBio(false);
         setBio('');
      }
   }

   return (
      getProfileError ? <Redirect to="/404" /> :
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
                        <p className="open-edit-bio-btn" onClick={handleOpenBioEditor}>Edit bio</p>
                        {editBio && <form onSubmit={handleEditBioSubmit}>
                           <textarea
                              cols="25" rows="3"
                              value={bio}
                              onChange={e => setBio(e.target.value)}
                              autoFocus
                           >{bio}</textarea>
                           {bioError && <p className="bio-error">{bioError}</p>}
                           <div className="bio-btn-container">
                              <p>{100 - bio.length} Charecters left</p>
                              <button
                              type="submit"
                              className="btn save-bio-btn"
                              >Save</button>
                           </div>
                        </form>}
                     </div>}
                     <div className="bio">
                        {profile.bio}
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
