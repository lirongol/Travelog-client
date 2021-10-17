import { SET_POST_ID } from '../types';

const postIdReducer = (postId = null, action) => {
   return action.type === SET_POST_ID ? action.payload : postId;
}

export default postIdReducer;