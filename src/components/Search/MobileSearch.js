import React from 'react';
import './search.css';
import { CgSearch } from 'react-icons/cg';

function MobileSearch({ mobileSearch, setMobileSearch }) {
   return (
      <>
         {mobileSearch && <div className="mobile-search">
            <div className="search-container search-container-mobile search-focus">
               <CgSearch className="search-icon" />
               <input
                  type="search"
                  placeholder="Search"
                  autoFocus
                  onBlur={() => setMobileSearch(false)}
               />
            </div>
         </div>}
      </>
   )
}

export default MobileSearch;
