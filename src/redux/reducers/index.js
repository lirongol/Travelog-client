import { combineReducers } from "redux";
import auth from './auth';
import feedPosts from './feedPosts';
import postId from './postId';
import profile from './profile';
import profilePosts from './profilePosts';
import error from './error';

const reducers = combineReducers({
   auth,
   feedPosts,
   postId,
   profile,
   profilePosts,
   error
});

export default reducers;