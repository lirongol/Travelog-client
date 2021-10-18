import * as api from '../../api';
import { CREATE_POST, UPDATE_POST, SET_POST_ID, DELETE_POST } from '../types';

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

export const deletePost = postId => async dispatch => {
   try {
      const { data } = await api.deletePost(postId);
      dispatch({ type: DELETE_POST, payload: { data, postId } });
   } catch (err) {
      console.log(err)
   }
}

export const postUpVote = postId => async dispatch => {
   try {
      const { data } = await api.postUpVote(postId);
      dispatch({ type: UPDATE_POST, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const postDownVote = postId => async dispatch => {
   try {
      const { data } = await api.postDownVote(postId);
      dispatch({ type: UPDATE_POST, payload: data });
   } catch (err) {
      console.log(err)
   }
}

export const setPostId = postId => dispatch => {
   dispatch({ type: SET_POST_ID, payload: postId });
}