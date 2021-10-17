import React, { useState, useEffect } from 'react';
import './app.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// pages
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';

// components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
   const [profileDropdown, setProfileDropdown] = useState(() => false);
   const [notificationDropdown, setNotificationDropdown] = useState(() => false);
   const [postEditor, setPostEditor] = useState(() => false);
   const dispatch = useDispatch();
   const location = useLocation();

   useEffect(() => {
      dispatch({ type: 'AUTH', payload: JSON.parse(localStorage.getItem('profile')) });
   }, [location, dispatch]);
   const profile = useSelector(state => state?.auth);

   const handleAppClick = () => {
      setProfileDropdown(false);
      setNotificationDropdown(false);
   }

   return (
      <div className="app" onClick={handleAppClick}>
         {profile && <Navbar
            profileDropdown={profileDropdown}
            setProfileDropdown={setProfileDropdown}
            notificationDropdown={notificationDropdown}
            setNotificationDropdown={setNotificationDropdown}
            setPostEditor={setPostEditor}
            postEditor={postEditor}
         />}
         <div className={!profile ? null : 'container'}>
            {profile && <div className="sidebar">
               <Sidebar />
            </div>}
            <div className={!profile ? null : 'main-content'}>
               <Switch>

                  {!profile && <Route path="/">
                     <AuthPage />
                  </Route>}

                  <Route exact path="/">
                     <HomePage setPostEditor={setPostEditor} />
                  </Route>

               </Switch>
            </div>
         </div>
      </div>
   )
}

export default App;
