import { GET_CHATS, UPDATE_CHAT } from "../types";

const chatsReducer = (chats = [], action) => {
   switch (action.type) {
      case GET_CHATS:
         return action.payload;
      case UPDATE_CHAT:
         return chats.map(chat => (
            chat._id === action.payload._id ? action.payload : chat
         ))
      default:
         return chats;
   }
}

export default chatsReducer;