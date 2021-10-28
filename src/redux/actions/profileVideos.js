import * as api from '../../api';
import { GET_PROFILE_VIDEOS } from '../types';

export const getProfileVideos = username => async dispatch => {
   try {
      const { data } = await api.getProfileVideos(username);
      dispatch({ type: GET_PROFILE_VIDEOS, payload: data });
   } catch (err) {
      console.log(err);
   }
}