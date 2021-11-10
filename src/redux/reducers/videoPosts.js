import { GET_VIDEO_POSTS, UPDATE_VIDEO_POST, CLEAR_VIDEO_POSTS } from '../types';

const videoPostsReducer = (videoPosts = { posts: [], info: {} }, action) => {
   switch (action.type) {
      case GET_VIDEO_POSTS:
         return {
            info: action.payload.info,
            posts: [...videoPosts.posts, ...action.payload.posts]
         }
      case UPDATE_VIDEO_POST:
         return {
            ...videoPosts,
            posts: videoPosts.posts.map(post => (
               post._id === action.payload._id ? action.payload : post
            ))
         }
      case CLEAR_VIDEO_POSTS:
         return { posts: [], info: {} };
      default:
         return videoPosts;
   }
}

export default videoPostsReducer;