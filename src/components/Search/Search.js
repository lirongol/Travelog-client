import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions/search';
import './Search.css';
import { CgSearch } from 'react-icons/cg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SEARCH } from '../../redux/types';
import { Link } from 'react-router-dom';

function Search({ inputFocus, setInputFocus, setProfileDropdown, setNotificationDropdown }) {
   const dispatch = useDispatch();
   const [input, setInput] = useState('');

   const handleSearch = e => {
      dispatch({ type: SEARCH, payload: { profiles: [], tags: [] } });
      setInput(e.target.value);
      dispatch(search(e.target.value, 5));
   }

   const results = useSelector(state => state?.search);

   return (
      <div className="search" onClick={e => e.stopPropagation()}>
         <div className={`search-container ${inputFocus ? 'search-focus' : 'search-blur'}`}>
            <CgSearch className="search-icon" />
            <input
               type="search"
               placeholder={inputFocus ? null : 'Search'}
               onFocus={() => {
                  setInputFocus(true);
                  setProfileDropdown(false);
                  setNotificationDropdown(false);
               }}
               onChange={handleSearch}
               value={input}
            />
         </div>

         {inputFocus && <div className="search-result-desktop slide-bottom">

            {!input ? <div className="results-placeholder">
               <p>Search for profiles and tags</p>
            </div>
               :
               results.msg ?
                  <div className="results-placeholder">
                     <p>{results.msg}</p>
                  </div>
                  :
                  !results.profiles.length && !results.tags.length ?
                     <CircularProgress style={{ color: 'var(--orange-1)' }} />
                     :
                     (
                        <>
                           {results.profiles.length > 0 && <div className="profiles-results">
                              <h3 className="result-type">Profiles</h3>
                              {results.profiles.map(profile => {
                                 return (
                                    <Link
                                       key={profile.username}
                                       to={`/${profile.username}`}
                                       className="profile-result"
                                       onClick={() => { setInputFocus(false); setInput('') }}
                                    >
                                       <div className="profile-resulst-avatar">
                                          <img src={profile.profileImg.url} alt="" />
                                       </div>
                                       <div className="result-profile-info">
                                          <h4>{profile.fullName}</h4>
                                          <p>@{profile.username}</p>
                                       </div>
                                    </Link>
                                 )
                              })}
                           </div>}
                           
                           {results.tags.length > 0 && <div className="tags-results">
                              <h3 className="result-type">Tags</h3>
                              {results.tags.map(tag => {
                                 return (
                                    <Link
                                       key={tag}
                                       to={`/tags/${tag[0]}`}
                                       className="tag-result"
                                       onClick={() => { setInputFocus(false); setInput('') }}
                                    >
                                       <div>
                                          <h3>#{tag[0]}</h3>
                                          <p>{tag[1]} Posts</p>
                                       </div>
                                    </Link>
                                 )
                              })}
                           </div>}
                        </>
                     )
            }

         </div>}

      </div>
   )
}

export default Search;
