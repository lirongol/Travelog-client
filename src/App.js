import React, { useState, useEffect } from 'react';
import './app.css';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PROFILE, RESET_PROFILE_POSTS } from './redux/types';

// pages
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

// components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

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
      window.scrollTo(0, 0);
   }, [dispatch, location])

   const user = useSelector(state => state?.auth?.token);

   const handleAppClick = () => {
      setProfileDropdown(false);
      setNotificationDropdown(false);
   }

   return (
      <div className="app" onClick={handleAppClick}>
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

                  <Route exact path="/:username">
                     <ProfilePage setPostEditor={setPostEditor} />
                  </Route>

                  <Route path="/">
                     <div>404 not found</div>
                  </Route>

               </Switch>
            </div>
         </div>
      </div>
   )
}

export default App;
