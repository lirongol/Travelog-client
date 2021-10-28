import { GET_PROFILE_IMAGES } from '../types';

const profileImagesReducer = (profileImages = { images: [] }, action) => {
   switch (action.type) {
      case GET_PROFILE_IMAGES:
         return { ...profileImages, images: action.payload };
      default:
         return profileImages;
   }
}

export default profileImagesReducer;