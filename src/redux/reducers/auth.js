import { AUTH, LOGOUT, AUTH_IMG_UPDATE } from '../types';

const authReducer = (auth = null, action) => {
   switch (action.type) {
      case AUTH:
         localStorage.setItem('profile', JSON.stringify(action?.payload));
         return action?.payload;
      case LOGOUT:
         localStorage.clear();
         return null;
      case AUTH_IMG_UPDATE:
         const profile = JSON.parse(localStorage.getItem('profile'));
         profile.existingUser.profileImg = action.payload.profileImg;
         localStorage.setItem('profile', JSON.stringify(profile));
         return JSON.parse(localStorage.getItem('profile'));
      default:
         return auth;
   }
}

export default authReducer;