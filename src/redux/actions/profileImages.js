import * as api from '../../api';
import { GET_PROFILE_IMAGES } from '../types';

export const getProfileImages = username => async dispatch => {
   try {
      const { data } = await api.getProfileImages(username);
      dispatch({ type: GET_PROFILE_IMAGES, payload: data });
   } catch (err) {
      console.log(err);
   }
}