import { combineReducers } from "redux";
import auth from './auth';
import feedPosts from './feedPosts';
import postId from './postId';
import profile from './profile';
import profilePosts from './profilePosts';
import error from './error';
import explorePosts from './explorePosts';

const reducers = combineReducers({
   auth,
   feedPosts,
   postId,
   profile,
   profilePosts,
   explorePosts,
   error
});

export default reducers;