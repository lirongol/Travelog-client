import * as api from '../../api';
import { GET_PROFILE, UPDATE_PROFILE, GET_PROFILE_ERROR } from '../types';

export const getProfile = username => async dispatch => {
   try {
      const { data } = await api.getProfile(username);
      dispatch({ type: GET_PROFILE, payload: data });
   } catch (err) {
      dispatch({ type: GET_PROFILE_ERROR, payload: err.response.data.msg });
   }
}

export const updateBio = bio => async dispatch => {
   try {
      const { data } = await api.updateBio({ bio: bio });
      dispatch({ type: UPDATE_PROFILE, payload: data });
   } catch (err) {
      console.log(err)
   }
}

export const followProfile = username => async dispatch => {
   try {
      const { data } = await api.followProfile(username);
      dispatch({ type: UPDATE_PROFILE, payload: data });
   } catch (err) {
      console.log(err.response.data.msg);
   }
}