import { combineReducers } from "redux";
import auth from './auth';
import feedPosts from './feedPosts';
import postId from './postId';
import profile from './profile';
import profilePosts from './profilePosts';

const reducers = combineReducers({
   auth,
   feedPosts,
   postId,
   profile,
   profilePosts
});

export default reducers;