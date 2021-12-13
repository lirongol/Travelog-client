import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, followProfile, updateBio, updateProfileImg } from '../../redux/actions/profile';
import { newChat } from '../../redux/actions/chat';
import { AiOutlineCheck, AiOutlineVideoCamera } from 'react-icons/ai';
import { BsFilePost } from 'react-icons/bs';
import { IoMdImages } from 'react-icons/io';
import { FaPassport } from 'react-icons/fa';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfilePosts from '../../components/Posts/ProfilePosts';
import { Redirect, useHistory } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import FollowList from '../../components/FollowList/FollowList';
import ProfileImages from '../../components/ProfileImages/ProfileImages';
import ProfileVideos from '../../components/ProfileVideos/ProfileVideos';

function ProfilePage({ setPostEditor, setActiveChat }) {
   const dispatch = useDispatch();
   const { username } = useParams();
   document.title = `Travelog | ${username}`;
   const [selected, setSelected] = useState('posts');
   const [editBio, setEditBio] = useState(false);
   const [bio, setBio] = useState('');
   const [bioError, setBioError] = useState('');
   const [isMouseOver, setIsMouseOver] = useState(false);
   const [followList, setFollowList] = useState('');
   const history = useHistory();

   const user = useSelector(state => state?.auth?.existingUser);
   const profile = useSelector(state => state?.profile);
   const getProfileError = useSelector(state => state.error.getProfileError);
   const isMyProfile = user._id === profile._id;

   useEffect(() => {
      dispatch(getProfile(username));
      setSelected('posts');
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

   const handleSelectFile = () => {
      const inputVideo = document.querySelectorAll('input[type="file"]')[0];
      inputVideo.click();
   }

   const uploadProfileImg = base64 => {
      dispatch(updateProfileImg(base64));
   }

   const handleNewChat = () => {
      dispatch(newChat(profile._id));
      history.push('/messages');
   }

   return (
      getProfileError ? <Redirect to="/404" /> :
      <div className="profile-page">
         {profile.username ? (
            <div className="profile">

               <div className="profile-header">

                  <div
                     className="profile-img"
                     onMouseOver={() => setIsMouseOver(true)}
                     onMouseLeave={() => setIsMouseOver(false)}
                  >
                     <img src={profile.profileImg?.url} alt="profile" />
                     {(isMyProfile && isMouseOver) && <div className="upload-profile-img" onClick={handleSelectFile}>
                        <AiOutlineCloudUpload style={{fontSize: '1.5rem'}} />
                        <h3>Upload</h3>
                        <FileBase64
                           type="file"
                           accept="image/*"
                           onDone={file => uploadProfileImg(file.base64)}
                        />
                     </div>}
                  </div>

                  <div className="profile-name">
                        <h1>
                           {profile.fullName}
                           {!isMyProfile && <span>
                              <button className="btn btn-msg" onClick={handleNewChat}>Message</button>
                           </span>}
                        </h1>
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
                     <div className="followers-count stat" onClick={() => setFollowList('Followers')}>
                        <h4>Followers</h4>
                        <span>{profile.followers.length}</span>
                     </div>
                     <div className="following-count stat" onClick={() => setFollowList('Following')}>
                        <h4>Following</h4>
                        <span>{profile.following.length}</span>
                     </div>
                  </div>
                  
                  {followList && <FollowList title={followList} setFollowList={setFollowList} username={username} />}

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
                        
                     {selected === 'images' && <div>
                        <ProfileImages username={username} />
                     </div>}
                        
                     {selected === 'videos' && <div className="posts-container">
                        <ProfileVideos username={username} />
                     </div>}

                  </div>

               </div>

            </div>
         ) : <CircularProgress style={{ color: 'var(--orange-1)' }} />}
      </div>
   )
}

export default ProfilePage;
