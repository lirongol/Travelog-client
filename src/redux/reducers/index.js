import { combineReducers } from "redux";
import auth from './auth';
import feedPosts from './feedPosts';
import postId from './postId';

const reducers = combineReducers({
   auth,
   feedPosts,
   postId
});

export default reducers;