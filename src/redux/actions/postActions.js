import * as api from '../../api';
import { CREATE_POST } from '../types';

export const createPost = post => async dispatch => {
   try {
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE_POST, payload: data });
   } catch (err) {
      console.log(err);
   }
}