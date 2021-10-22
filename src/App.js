import React, { useState, useEffect } from 'react';
import './app.css';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   UPDATE_PROFILE,
   RESET_PROFILE_POSTS,
   GET_PROFILE_ERROR,
   LOGIN_ERROR,
   REGISTER_ERROR,
   CREATE_POST_ERROR,
   UPDATE_POST_ERROR
} from './redux/types';

// pages
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFound from './pages/404/NotFound';

// components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import PopUp from './components/Error/PopUp';

function App() {
   const [profileDropdown, setProfileDropdown] = useState(() => false);
   const [notificationDropdown, setNotificationDropdown] = useState(() => false);
   const [postEditor, setPostEditor] = useState(() => false);
   const dispatch = useDispatch();
   const location = useLocation();
   const history = useHistory();

   useEffect(() => {
      dispatch({ type: 'AUTH', payload: JSON.parse(localStorage.getItem('profile')) });
      if (location.pathname !== '/:username' && history.action !== 'REPLACE') {
         dispatch({ type: UPDATE_PROFILE, payload: {} });
      }
   }, [dispatch, location, history]);

   useEffect(() => {
      dispatch({ type: RESET_PROFILE_POSTS });
      dispatch({ type: LOGIN_ERROR, payload: '' });
      dispatch({ type: REGISTER_ERROR, payload: '' });
      dispatch({ type: GET_PROFILE_ERROR, payload: '' });
      window.scrollTo(0, 0);
   }, [dispatch, location])

   const user = useSelector(state => state?.auth?.token);
   const error = useSelector(state => state.error);

   const handleAppClick = () => {
      setProfileDropdown(false);
      setNotificationDropdown(false);
   }

   const dismissCreatePostError = () => dispatch({ type: CREATE_POST_ERROR, payload: '' });
   const dismissUpdatePostError = () => dispatch({ type: UPDATE_POST_ERROR, payload: '' });

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

         {user && <Navbar
            profileDropdown={profileDropdown}
            setProfileDropdown={setProfileDropdown}
            notificationDropdown={notificationDropdown}
            setNotificationDropdown={setNotificationDropdown}
            setPostEditor={setPostEditor}
            postEditor={postEditor}
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
                     <HomePage setPostEditor={setPostEditor} />
                  </Route>

                  <Route exact path="/videos">
                     <div>VideosPage</div>
                  </Route>

                  <Route exact path="/tags">
                     <div>TagsPage</div>
                  </Route>

                  <Route exact path="/tags/:tag">
                     <div>TagPage</div>
                  </Route>

                  <Route exact path="/404">
                     <NotFound />
                  </Route>

                  <Route exact path="/:username">
                     <ProfilePage setPostEditor={setPostEditor} />
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
