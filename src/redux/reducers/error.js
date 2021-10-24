import {
   REGISTER_ERROR,
   LOGIN_ERROR,
   GET_PROFILE_ERROR,
   CREATE_POST_ERROR,
   UPDATE_POST_ERROR,
   PROFILE_IMG_ERROR
} from '../types';

const errorReducer = (error = {
   registerError: '',
   loginError: '',
   getProfileError: '',
   createPostError: '',
   updatePostError: '',
   profileImgError: ''
}, action) => {
   switch (action.type) {
      case REGISTER_ERROR:
         return { ...error, registerError: action.payload };
      case LOGIN_ERROR:
         return { ...error, loginError: action.payload };
      case GET_PROFILE_ERROR:
         return { ...error, getProfileError: action.payload };
      case CREATE_POST_ERROR:
         return { ...error, createPostError: action.payload };
      case UPDATE_POST_ERROR:
         return { ...error, updatePostError: action.payload };
      case PROFILE_IMG_ERROR:
         return { ...error, profileImgError: action.payload };
      default:
         return error;
   }
}

export default errorReducer;