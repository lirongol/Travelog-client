import * as api from '../../api';
import { GET_TAGS, GET_TAG_POSTS, CLEAR_TAG_POSTS } from '../types';

export const getTags = () => async dispatch => {
   try {
      const { data } = await api.getTags();
      dispatch({ type: GET_TAGS, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const getTagPosts = (tag, page, limit) => async dispatch => {
   try {
      const { data } = await api.getTagPosts(tag, page, limit);
      dispatch({ type: GET_TAG_POSTS, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const clearTagPosts = () => dispatch => {
   dispatch({ type: CLEAR_TAG_POSTS });
}