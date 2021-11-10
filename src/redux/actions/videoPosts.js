import * as api from '../../api';
import { GET_VIDEO_POSTS } from '../types';

export const getVideoPosts = (page, limit) => async dispatch => {
   try {
      const { data } = await api.getVideoPosts(page, limit);
      dispatch({ type: GET_VIDEO_POSTS, payload: data });
   } catch (err) {
      console.log(err);
   }
}