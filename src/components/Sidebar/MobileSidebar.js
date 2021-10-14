import React from 'react';
import './Sidebar.css';
import MobileLinks from './Links/MobileLinks';
import { CgClose } from 'react-icons/cg';

function MobileSidebar({ setMobileSidebar }) {
   return (
      <div className="mobile-sidebar" onClick={e => e.stopPropagation()}>
         <div className="mobile-sidebar-header">
            <CgClose className="sidebar-close-icon" onClick={() => setMobileSidebar(false)} />
         </div>
         <div className="sidebar-links">
            <MobileLinks setMobileSidebar={setMobileSidebar} />
         </div>
      </div>
   )
}

export default MobileSidebar;
