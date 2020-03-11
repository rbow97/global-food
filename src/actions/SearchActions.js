import axios from "axios";
import { FETCH_SEARCH, IS_SEARCHING, SET_QUERY } from "./types";

const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";

const searching = status => {
  return {
    type: IS_SEARCHING,
    payload: status
  };
};

const dispatchSearchResults = response => {
  return {
    type: FETCH_SEARCH,
    payload: response.data.results
  };
};

const dispatchQuery = search => {
  return {
    type: SET_QUERY,
    payload: search
  };
};

export const fetchSearch = search => {
  return async dispatch => {
    dispatch(searching(true));
    dispatch(dispatchQuery(search));
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?query=${search}&number=2&apiKey=${APP_KEYrose}`
    );
    // dispatch({
    //   type: FETCH_SEARCH,
    //   payload: response.data.results
    // });
    dispatch(searching(false));
    dispatch(dispatchSearchResults(response));
  };
};
