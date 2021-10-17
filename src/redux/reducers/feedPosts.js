import { CREATE_POST, UPDATE_POST, GET_FEED_POSTS } from '../types';

const feedPostsReducer = (feedPosts = { info: {}, posts: [] }, action) => {
   switch (action.type) {
      case CREATE_POST:
         return { ...feedPosts, posts: [action.payload, ...feedPosts.posts] };
      case UPDATE_POST:
         return {
            ...feedPosts,
            posts: feedPosts.posts.map(post => (
               post._id === action.payload._id ? action.payload : post
            ))
         }
      case GET_FEED_POSTS:
         return {
            info: action.payload.info,
            posts: [...feedPosts.posts, ...action.payload.posts]
         };
      default:
         return feedPosts;
   }
}

export default feedPostsReducer;