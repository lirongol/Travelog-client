import { GET_EXPLORE_POSTS, UPDATE_EXPLORE_POST, CLEAR_EXPLORE_POSTS } from "../types";

const explorePostsReducer = (explorePosts = { info: {}, posts: [] }, action) => {
   switch (action.type) {
      case GET_EXPLORE_POSTS:
         return {
            info: action.payload.info,
            posts: [...explorePosts.posts, ...action.payload.posts]
         }
      case UPDATE_EXPLORE_POST:
         return {
            ...explorePosts,
            posts: explorePosts.posts.map(post => (
               post._id === action.payload._id ? action.payload : post
            ))
         }
      case CLEAR_EXPLORE_POSTS:
         return { info: {}, posts: [] };
      default:
         return explorePosts;
   }
}

export default explorePostsReducer;