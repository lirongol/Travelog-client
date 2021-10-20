import * as api from '../../api';
import { GET_PROFILE_POSTS, REFRESH_PROFILE_POSTS } from '../types';

export const getProfilePosts = (userId, page, limit) => async dispatch => {
   try {
      const { data } = await api.getProfilePosts(userId, page, limit);
      dispatch({ type: GET_PROFILE_POSTS, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const refreshProfilePosts = (userId, limit) => async dispatch => {
   try {
      const { data } = await api.refreshProfilePosts(userId, limit);
      dispatch({ type: REFRESH_PROFILE_POSTS, payload: data });
   } catch (err) {
      console.log(err);
   }
}