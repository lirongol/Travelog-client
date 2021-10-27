import * as api from '../../api';
import { GET_FOLLOWERS, GET_FOLLOWING, CLEAR_FOLLOW_LIST } from '../types';

export const getFollowers = username => async dispatch => {
   try {
      const { data } = await api.getProfileFollowers(username);
      dispatch({ type: GET_FOLLOWERS, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const getFollowing = username => async dispatch => {
   try {
      const { data } = await api.getProfileFollowing(username);
      dispatch({ type: GET_FOLLOWING, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const clearFollowList = () => dispatch => {
   dispatch({ type: CLEAR_FOLLOW_LIST });
}