import React from 'react';
import './Search.css';
import { CgSearch } from 'react-icons/cg';

function Search({inputFocus, setInputFocus}) {
   return (
      <div className="search">
         <div className={`search-container ${inputFocus ? 'search-focus' : 'search-blur'}`}>
            <CgSearch className="search-icon" />
            <input
               type="search"
               placeholder={inputFocus ? null : 'Search'}
               onFocus={() => setInputFocus(true)}
               onBlur={() => setInputFocus(false)}
            />
         </div>
      </div>
   )
}

export default Search;
