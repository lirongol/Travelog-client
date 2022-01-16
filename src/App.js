import React, { useState, useEffect } from 'react';
import './app.css';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from './redux/actions/chat';
import { production } from './config';
import {
   UPDATE_PROFILE,
   RESET_PROFILE_POSTS,
   GET_PROFILE_ERROR,
   LOGIN_ERROR,
   REGISTER_ERROR,
   CREATE_POST_ERROR,
   UPDATE_POST_ERROR,
   PROFILE_IMG_ERROR,
   GET_PROFILE_IMAGES,
   GET_PROFILE_VIDEOS,
   CLEAR_TAG_POSTS,
   CLEAR_VIDEO_POSTS
} from './redux/types';

// pages
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFound from './pages/404/NotFound';
import TagsPage from './pages/TagsPage/TagsPage';
import TagPage from './pages/TagPage/TagPage';
import VideosPage from './pages/VideosPage/VideosPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';

// components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import PopUp from './components/Error/PopUp';

import io from 'socket.io-client';
const socket = io(production ? 'https://travelogapi.herokuapp.com' : 'http://localhost:5000');

function App() {
   const [profileDropdown, setProfileDropdown] = useState(() => false);
   const [notificationDropdown, setNotificationDropdown] = useState(() => false);
   const [explorePosts, setExplorePosts] = useState(() => false);
   const [postEditor, setPostEditor] = useState(() => false);
   const [inputFocus, setInputFocus] = useState(() => false);
   const [mobileSearch, setMobileSearch] = useState(() => false);
   const [activeChat, setActiveChat] = useState('');
   const dispatch = useDispatch();
   const location = useLocation();
   const history = useHistory();

   const user = useSelector(state => state?.auth);
   const error = useSelector(state => state.error);

   useEffect(() => {
      socket.emit('user-online', JSON.parse(localStorage.getItem('profile'))?.existingUser._id);
   }, [user])

   useEffect(() => {
      dispatch(getChats());
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      dispatch({ type: 'AUTH', payload: JSON.parse(localStorage.getItem('profile')) });
      if (location.pathname !== '/:username' && history.action !== 'REPLACE') {
         dispatch({ type: UPDATE_PROFILE, payload: {} });
         dispatch({ type: GET_PROFILE_IMAGES, payload: [] });
         dispatch({ type: GET_PROFILE_VIDEOS, payload: [] });
      }
   }, [dispatch, location, history]);

   useEffect(() => {
      dispatch({ type: CLEAR_TAG_POSTS });
      dispatch({ type: RESET_PROFILE_POSTS });
      dispatch({ type: CLEAR_VIDEO_POSTS });
      dispatch({ type: LOGIN_ERROR, payload: '' });
      dispatch({ type: REGISTER_ERROR, payload: '' });
      dispatch({ type: GET_PROFILE_ERROR, payload: '' });
      // window.scrollTo(0, 0);
   }, [dispatch, location])

   const handleAppClick = () => {
      setNotificationDropdown(false);
      setProfileDropdown(false);
      setInputFocus(false);
      setMobileSearch(false);
   }

   const dismissCreatePostError = () => dispatch({ type: CREATE_POST_ERROR, payload: '' });
   const dismissUpdatePostError = () => dispatch({ type: UPDATE_POST_ERROR, payload: '' });
   const dismissProfileImgError = () => dispatch({ type: PROFILE_IMG_ERROR, payload: '' });

   return (
      <div className="app" onClick={handleAppClick}>

         {/* popup errors */}
         {error.createPostError &&
            <PopUp
            title="Create Post Error"
            msg={error.createPostError}
            dismiss={dismissCreatePostError}
            />
         }

         {error.updatePostError && 
            <PopUp
            title="Update Post Error"
            msg={error.updatePostError}
            dismiss={dismissUpdatePostError}
            />
         }

         {error.profileImgError &&
            <PopUp
            title="Profile Image Error"
            msg={error.profileImgError}
            dismiss={dismissProfileImgError}
            />
         }

         {user && <Navbar
            profileDropdown={profileDropdown}
            setProfileDropdown={setProfileDropdown}
            notificationDropdown={notificationDropdown}
            setNotificationDropdown={setNotificationDropdown}
            setPostEditor={setPostEditor}
            postEditor={postEditor}
            inputFocus={inputFocus}
            setInputFocus={setInputFocus}
            mobileSearch={mobileSearch}
            setMobileSearch={setMobileSearch}
         />}
         <div className={!user ? null : 'container'}>
            {user && <div className="sidebar">
               <Sidebar />
            </div>}
            <div className={!user ? null : 'main-content'}>
               <Switch>

                  {!user && <Route path="/">
                     <AuthPage />
                  </Route>}

                  <Route exact path="/">
                     <HomePage
                        setPostEditor={setPostEditor}
                        explorePosts={explorePosts}
                        setExplorePosts={setExplorePosts}
                     />
                  </Route>

                  <Route exact path="/videos">
                     <VideosPage />
                  </Route>

                  <Route exact path="/tags">
                     <TagsPage />
                  </Route>

                  <Route exact path="/messages">
                     <MessagesPage socket={socket} activeChat={activeChat} setActiveChat={setActiveChat} />
                  </Route>

                  <Route exact path="/messages/:userId">
                     <MessagesPage socket={socket} activeChat={activeChat} setActiveChat={setActiveChat} />
                  </Route>

                  <Route exact path="/tags/:tag">
                     <TagPage setPostEditor={setPostEditor} />
                  </Route>

                  <Route exact path="/404">
                     <NotFound />
                  </Route>

                  <Route exact path="/:username">
                     <ProfilePage setPostEditor={setPostEditor} setActiveChat={setActiveChat} />
                  </Route>

                  <Route path="/">
                     <NotFound />
                  </Route>

               </Switch>
            </div>
         </div>
      </div>
   )
}

export default App;
