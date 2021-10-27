import { GET_FOLLOWERS, GET_FOLLOWING, CLEAR_FOLLOW_LIST } from "../types";

const followListReducer = (followList = { followers: [], following: [] }, action) => {
   switch (action.type) {
      case GET_FOLLOWERS:
         return { ...followList, followers: action.payload };
      case GET_FOLLOWING:
         return { ...followList, following: action.payload };
      case CLEAR_FOLLOW_LIST:
         return { followers: [], following: [] };
      default:
         return followList;
   }
}

export default followListReducer;