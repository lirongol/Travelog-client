import { combineReducers } from "redux";
import auth from './auth';
import feedPosts from './feedPosts';

const reducers = combineReducers({
   auth,
   feedPosts
});

export default reducers;