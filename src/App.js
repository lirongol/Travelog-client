import React from 'react';
import './app.css';

// pages


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
               <h1>Travelog App</h1>
            </div>
         </div>
      </div>
   )
}

export default App;
