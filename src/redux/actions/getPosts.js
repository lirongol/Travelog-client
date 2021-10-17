import * as api from '../../api';
import { GET_FEED_POSTS } from '../types';

export const getFeedPosts = page => async dispatch => {
   try {
      const { data } = await api.getFeedPosts(page);
      dispatch({ type: GET_FEED_POSTS, payload: data })
   } catch (err) {
      console.log(err);
   }
}