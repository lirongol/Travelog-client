import { CREATE_POST, GET_FEED_POSTS } from '../types';

const feedPostsReducer = (feedPosts = [], action) => {
   switch (action.type) {
      case CREATE_POST:
         return [action.payload, ...feedPosts];
      case GET_FEED_POSTS:
         return action.payload;
      default:
         return feedPosts;
   }
}

export default feedPostsReducer;