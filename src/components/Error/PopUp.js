import React from 'react';
import './Error.css';
import { CgClose } from 'react-icons/cg';

function PopUp({ title, msg, dismiss }) {
   return (
      <div className="backdrop error-popup-backdrop" onClick={dismiss}>
         <div className="error-msg-container" onClick={e => e.stopPropagation()}>
            <div className="nav-item error-popup-close-icon" onClick={dismiss}>
               <CgClose />
            </div>
            <div className="error-msg-header">
               <h3>{title}</h3>
            </div>
            <div className="error-msg-body">
               <p>{msg}</p>
            </div>
            <div className="error-confirm-btn">
               <button className="btn btn-error-popup" onClick={dismiss}>Ok</button>
            </div>
         </div>
      </div>
   )
}

export default PopUp;
