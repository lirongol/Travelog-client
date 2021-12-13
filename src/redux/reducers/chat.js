import { GET_CHATS, UPDATE_CHAT, RECEIVE_MSG, NEW_CHAT } from "../types";

const chatsReducer = (chats = [], action) => {
   switch (action.type) {
      case GET_CHATS:
         return action.payload;
      case UPDATE_CHAT:
         return chats.map(chat => {
            if (chat._id === action.payload.chatId) {
               return { ...chat, messages: [...chat.messages, action.payload.newMessage] };
            } else return chat;
         })
      case RECEIVE_MSG:
         return chats.map(chat => {
            if (chat._id === action.payload.chatId) {
               return { ...chat, messages: [...chat.messages, action.payload.newMessage] };
            } else return chat;
         })
      case NEW_CHAT:
         return [action.payload, ...chats]
      default:
         return chats;
   }
}

export default chatsReducer;