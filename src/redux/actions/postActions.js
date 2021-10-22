import * as api from '../../api';
import {
   CREATE_POST,
   UPDATE_POST,
   SET_POST_ID,
   DELETE_POST,
   UPDATE_PROFILE_POST,
   DELETE_PROFILE_POST,
   CREATE_PROFILE_POST,
   CREATE_POST_ERROR,
   UPDATE_POST_ERROR
} from '../types';

export const createPost = (post, profileId) => async dispatch => {
   try {
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE_POST, payload: data });
      dispatch({ type: CREATE_PROFILE_POST, payload: { data, profileId } });
   } catch (err) {
      dispatch({ type: CREATE_POST_ERROR, payload: err.response.data.msg });
   }
}

export const updatePost = (postId, post) => async dispatch => {
   try {
      const { data } = await api.updatePost(postId, post);
      dispatch({ type: UPDATE_POST, payload: data });
      dispatch({ type: UPDATE_PROFILE_POST, payload: data });
   } catch (err) {
      dispatch({ type: UPDATE_POST_ERROR, payload: err.response.data.msg });
   }
}

export const deletePost = postId => async dispatch => {
   try {
      const { data } = await api.deletePost(postId);
      dispatch({ type: DELETE_POST, payload: { data, postId } });
      dispatch({ type: DELETE_PROFILE_POST, payload: { data, postId } });
   } catch (err) {
      console.log(err)
   }
}

export const postUpVote = postId => async dispatch => {
   try {
      const { data } = await api.postUpVote(postId);
      dispatch({ type: UPDATE_POST, payload: data });
      dispatch({ type: UPDATE_PROFILE_POST, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const postDownVote = postId => async dispatch => {
   try {
      const { data } = await api.postDownVote(postId);
      dispatch({ type: UPDATE_POST, payload: data });
      dispatch({ type: UPDATE_PROFILE_POST, payload: data });
   } catch (err) {
      console.log(err)
   }
}

export const setPostId = postId => dispatch => {
   dispatch({ type: SET_POST_ID, payload: postId });
}