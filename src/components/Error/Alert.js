import React from 'react';
import './Error.css';

function Alert({ msg }) {
   return (
      <div className="alert-container">
         <p className="alert-msg">{msg}</p>
      </div>
   )
}

export default Alert;
