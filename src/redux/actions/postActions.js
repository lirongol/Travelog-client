import * as api from '../../api';
import { CREATE_POST, UPDATE_POST, SET_POST_ID } from '../types';

export const createPost = post => async dispatch => {
   try {
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE_POST, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const updatePost = (postId, post) => async dispatch => {
   try {
      const { data } = await api.updatePost(postId, post);
      dispatch({ type: UPDATE_POST, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const setPostId = postId => dispatch => {
   dispatch({ type: SET_POST_ID, payload: postId });
}