import React from 'react';
import './app.css';
import { Switch, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage/HomePage';

// components
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
   return (
      <div className="app">
         <Navbar />
         <div className="container">
            <div className="sidebar">
               <Sidebar />
            </div>
            <div className="main-content">
               <Switch>
                  <Route exact path="/">
                     <HomePage />
                  </Route>
               </Switch>
            </div>
         </div>
      </div>
   )
}

export default App;
