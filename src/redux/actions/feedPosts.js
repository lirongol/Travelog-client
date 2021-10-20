import * as api from '../../api';
import { GET_FEED_POSTS, REFRESH_FEED_POSTS } from '../types';

export const getFeedPosts = (page, limit) => async dispatch => {
   try {
      const { data } = await api.getFeedPosts(page, limit);
      dispatch({ type: GET_FEED_POSTS, payload: data })
   } catch (err) {
      console.log(err);
   }
}

export const refreshFeedPosts = limit => async dispatch => {
   try {
      const { data } = await api.refreshFeedPosts(limit);
      dispatch({ type: REFRESH_FEED_POSTS, payload: data });
   } catch (err) {
      console.log(err)
   }
}