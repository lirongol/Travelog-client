import * as api from '../../api';
import { GET_EXPLORE_POSTS, CLEAR_EXPLORE_POSTS } from '../types';

export const getExplorePosts = (page, limit) => async dispatch => {
   try {
      const { data } = await api.getExplorePosts(page, limit);
      dispatch({ type: GET_EXPLORE_POSTS, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const clearExplorePosts = () => dispatch => {
   dispatch({ type: CLEAR_EXPLORE_POSTS });
}