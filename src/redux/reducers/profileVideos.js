import { GET_PROFILE_VIDEOS } from '../types';

const profileVideosReducer = (profileVideos = { videos: [] }, action) => {
   switch (action.type) {
      case GET_PROFILE_VIDEOS:
         return { ...profileVideos, videos: action.payload };
      default:
         return profileVideos;
   }
}

export default profileVideosReducer;