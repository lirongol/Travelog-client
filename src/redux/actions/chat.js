import * as api from '../../api';
import { GET_CHATS, UPDATE_CHAT, RECEIVE_MSG, NEW_CHAT } from '../types';

export const getChats = () => async dispatch => {
   try {
      const { data } = await api.getChats();
      dispatch({ type: GET_CHATS, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const sendMsg = (userId, message) => async dispatch => {
   try {
      const { data } = await api.sendMsg(userId, message);
      dispatch({ type: UPDATE_CHAT, payload: data });
   } catch (err) {
      console.log(err);
   }
}

export const receiveMsg = data => dispatch => {
   dispatch({ type: RECEIVE_MSG, payload: data });
}

export const newChat = receiverId => async dispatch => {
   try {
      const { data } = await api.newChat(receiverId);
      dispatch({ type: NEW_CHAT, payload: data });
   } catch (err) {
      console.log(err);
   }
}