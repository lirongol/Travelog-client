import * as api from '../../api';
import { SEARCH } from '../types';

export const search = (q, limit) => async dispatch => {
   try {
      const { data } = await api.search(q, limit);
      dispatch({ type: SEARCH, payload: data });
   } catch (err) {
      dispatch({ type: SEARCH, payload: {msg: err.response.data.msg} });
   }
}