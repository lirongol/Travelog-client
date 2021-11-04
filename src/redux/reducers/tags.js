import { GET_TAGS, GET_TAG_POSTS, CLEAR_TAG_POSTS, UPDATE_TAG_POST, DELETE_TAG_POST } from '../types';

const tagsReducer = (tags = { tagsInfo: [], posts: [], info: {} }, action) => {
   switch (action.type) {
      case GET_TAGS:
         return { ...tags, tagsInfo: action.payload };
      case GET_TAG_POSTS:
         return {
            ...tags,
            posts: [...tags.posts, ...action.payload.posts],
            info: action.payload.info
         }
      case CLEAR_TAG_POSTS:
         return { ...tags, posts: [], info: {} };
      case UPDATE_TAG_POST:
         return {
            ...tags,
            posts: tags.posts.map(post => (
               post._id === action.payload._id ? action.payload : post
            ))
         };
      case DELETE_TAG_POST:
         return {
            ...tags,
            posts: tags.posts.filter(post => (
               post._id !== action.payload.postId
            ))
         };
      default:
         return tags;
   }
}

export default tagsReducer;