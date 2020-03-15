import {
  FETCH_SEARCH,
  IS_SEARCHING,
  SET_QUERY,
  SET_VEGETARIAN,
  SET_VEGAN,
  SET_PESCETARIAN,
  SET_CUISINE
} from "../actions/types";

const initState = {
  searchValue: [],
  searching: false,
  query: "",
  vegetarian: [],
  vegan: [],
  pescetarian: [],
  cuisine: []
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
    case SET_VEGETARIAN:
      return {
        ...state,
        vegetarian: action.payload
      };
    case SET_VEGAN:
      return {
        ...state,
        vegan: action.payload
      };
    case SET_PESCETARIAN:
      return {
        ...state,
        pescetarian: action.payload
      };
    case SET_CUISINE:
      return {
        ...state,
        cuisine: action.paylod
      };
    default:
      return state;
  }
};

export default SearchReducer;
