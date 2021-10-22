import React from 'react';
import './NotFound.css';

function NotFound() {
   document.title = 'Travelog | 404 Not Found'

   return (
      <div className="not-found-page">
         <h1>404 Not Found</h1>
         <h3>We were unable to find the page you were looking for</h3>

      </div>
   )
}

export default NotFound;
