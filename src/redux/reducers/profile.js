import { GET_PROFILE, UPDATE_PROFILE } from '../types';

const profileReducer = (profile = {}, action) => {
   switch (action.type) {
      case GET_PROFILE:
         return action.payload;
      case UPDATE_PROFILE:
         return action.payload;
      default:
         return profile;
   }
}

export default profileReducer;