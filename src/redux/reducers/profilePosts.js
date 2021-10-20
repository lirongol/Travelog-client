import {
   GET_PROFILE_POSTS,
   UPDATE_PROFILE_POST,
   DELETE_PROFILE_POST,
   RESET_PROFILE_POSTS,
   CREATE_PROFILE_POST,
   REFRESH_PROFILE_POSTS
} from '../types';

const profilePostsReducer = (profilePosts = { info: {}, posts: [] }, action) => {
   switch (action.type) {
      case GET_PROFILE_POSTS:
         return {
            info: action.payload.info,
            posts: [...profilePosts.posts, ...action.payload.posts]
         };
      case REFRESH_PROFILE_POSTS:
         return { ...profilePosts, posts: action.payload.posts };
      case CREATE_PROFILE_POST:
         return {
            ...profilePosts,
            posts: action.payload.profileId === action.payload.data.creatorId ?
               [action.payload.data, ...profilePosts.posts] : profilePosts.posts
         };
      case UPDATE_PROFILE_POST:
         return {
            ...profilePosts,
            posts: profilePosts.posts.map(post => (
               post._id === action.payload._id ? action.payload : post
            ))
         };
      case DELETE_PROFILE_POST:
         return {
            ...profilePosts,
            posts: profilePosts.posts.filter(post => (
               post._id !== action.payload.postId
            ))
         };
      case RESET_PROFILE_POSTS:
         return { info: {}, posts: [] };
      default:
         return profilePosts;
   }
}

export default profilePostsReducer;