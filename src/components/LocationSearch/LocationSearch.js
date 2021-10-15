import React, { useState } from 'react';
import './LocationSearch.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ImLocation } from 'react-icons/im';

import PlacesAutocomplete from 'react-places-autocomplete';

function LocationSearch({ setPostData, postData, setLocationForm }) {
   const [location, setLocation] = useState('');

   const handleSelect = value => {
      setLocation(value);
      setPostData({ ...postData, location: value });
      setLocationForm(false);
   };

   return (
      <div className="location-search-container">
         <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
               return (
                  <>
                     <input autoFocus {...getInputProps({ placeholder: 'Search location' })} />
                     <div className="suggestion-container">
                        {loading ? <CircularProgress style={{ color: 'var(--orange-1)' }} /> : null}
                        {suggestions.map(suggestion => {
                           const style = {
                              backgroundColor: suggestion.active ? 'var(--white-3)' : null,
                              color: suggestion.active ? 'var(--orange-1)' : null,
                           }
                           return (
                              <div
                                 className="suggestion"
                                 {...getSuggestionItemProps(suggestion, { style })}
                                 key={suggestion.placeId}
                              >
                                 <div>
                                    <ImLocation style={{fontSize: '1rem', marginRight: '5px'}} />
                                 </div>
                                 {suggestion.description}
                              </div>
                           )
                        })}
                     </div>
                  </>
               )
            }}
         </PlacesAutocomplete>
      </div>
   )
}

export default LocationSearch;
