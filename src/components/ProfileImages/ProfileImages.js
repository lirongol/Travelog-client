import React, { useEffect, useState } from 'react';
import './ProfileImages.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileImages } from '../../redux/actions/profileImages';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullScreen from '../MediaSlider/FullScreen';

function ProfileImages({ username }) {
   const dispatch = useDispatch();
   const [fsMode, setFsMode] = useState(false);
   const [idx, setIdx] = useState(0);

   useEffect(() => {
      dispatch(getProfileImages(username));
      // eslint-disable-next-line
   }, [])

   const { images } = useSelector(state => state.profileImages);

   return (
      <div className="profile-images-container">
         {fsMode && <FullScreen setFsMode={setFsMode} setIdx={setIdx} idx={idx} images={images} />}
         <div className="images-container">
            {images.length ?
               images.map((img, i) => {
                  return (
                     <div key={img.filename} className="img-container" onClick={() => {
                        setIdx(i);
                        setFsMode(true);
                     }}>
                        <img src={img.url} alt="profile-media" />
                     </div>
                  )
               })
               :
               images.msg ? <p>no images</p> : <CircularProgress style={{ color: 'var(--orange-1)' }} />
            }
         </div>
      </div>
   )
}

export default ProfileImages;
