import * as api from '../../api';
import { AUTH, LOGOUT, RESET_FEED_POSTS } from '../types';

export const login = (loginData, history) => async dispatch => {
   try {
      const { data } = await api.login(loginData);
      dispatch({ type: AUTH, payload: data });
      history.push('/');
   } catch (error) {
      console.log(error);
   }
}

export const register = (registerData, history) => async dispatch => {
   try {
      const { data } = await api.register(registerData);
      dispatch({ type: AUTH, payload: data });
      history.push('/');
   } catch (error) {
      console.log(error);
   }
}

export const logout = history => dispatch => {
   dispatch({ type: LOGOUT });
   dispatch({ type: RESET_FEED_POSTS })
   history.push('/');
}