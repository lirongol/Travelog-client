import React, { useEffect } from 'react';
import './ProfileVideos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileVideos } from '../../redux/actions/profileVideos';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProfileVideos({ username }) {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getProfileVideos(username))
   // eslint-disable-next-line
   }, [])

   const { videos } = useSelector(state => state.profileVideos);

   return (
      <div className="profile-videos-container">
         {
            videos.length ?
               videos.map(v => {
                  return (
                     <video key={v.filename} controls>
                        <source src={v.url} type="video/mp4" />
                     </video>
                  )
               })
            :
               videos.msg ? <p>no videos</p> : <CircularProgress style={{ color: 'var(--orange-1)' }} />
         }
      </div>
   )
}

export default ProfileVideos;
