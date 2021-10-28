import { combineReducers } from "redux";
import auth from './auth';
import feedPosts from './feedPosts';
import postId from './postId';
import profile from './profile';
import profilePosts from './profilePosts';
import error from './error';
import explorePosts from './explorePosts';
import followList from './followList';
import profileImages from './profileImages';
import profileVideos from "./profileVideos";

const reducers = combineReducers({
   auth,
   feedPosts,
   postId,
   profile,
   profilePosts,
   explorePosts,
   followList,
   profileImages,
   profileVideos,
   error
});

export default reducers;