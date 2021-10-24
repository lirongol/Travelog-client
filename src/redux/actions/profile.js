import * as api from '../../api';
import { GET_PROFILE, UPDATE_PROFILE, GET_PROFILE_ERROR, AUTH_IMG_UPDATE, PROFILE_IMG_ERROR } from '../types';

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
      const { data } = await api.updateBio({ bio });
      dispatch({ type: UPDATE_PROFILE, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const updateProfileImg = base64 => async dispatch => {
   try {
      const { data } = await api.updateProfileImg({ img: base64 });
      dispatch({ type: UPDATE_PROFILE, payload: data });
      dispatch({ type: AUTH_IMG_UPDATE, payload: data });
   } catch (err) {
      dispatch({ type: PROFILE_IMG_ERROR, payload: err.response.data.msg });
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