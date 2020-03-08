import { FETCH_SEARCH, IS_SEARCHING, SET_QUERY } from "../actions/types";

const initState = {
  searchValue: [],
  searching: false,
  query: ""
};

const SearchReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_SEARCH:
      return {
        ...state,
        searchValue: action.payload
      };
    case IS_SEARCHING:
      return {
        ...state,
        searching: action.payload
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    default:
      return state;
  }
};

export default SearchReducer;
