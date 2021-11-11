import { SEARCH } from '../types';

const searchReducer = (search = { profiles: [], tags: [] }, action) => {
   switch (action.type) {
      case SEARCH:
         return action.payload;
      default:
         return search;
   }
}

export default searchReducer;