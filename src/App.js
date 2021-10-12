import React from 'react';
import './app.css';

// pages


// components
import Navbar from './components/Navbar/Navbar';

function App() {
   return (
      <div className="app">
         <Navbar />
         <div className="container">
            <h1>Travelog App</h1>
         </div>
      </div>
   )
}

export default App;
