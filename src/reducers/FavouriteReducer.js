import { SET_FAVOURITE, LOAD_LOCAL_FAVOURITES } from "../actions/types";

const initState = {
  favourites: []
};

const setFavouritesHelper = (state, favouriteObject) => {
  const newFavouritesArray = [...state.favourites];
  // Check for duplicates
  if (newFavouritesArray.includes(favouriteObject)) {
    console.log("duplicate favourite");
  } else {
    // Add new if not a duplicate
    newFavouritesArray.push(favouriteObject);
  }
  // Return new state
  return newFavouritesArray;
};

const FavouriteReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FAVOURITE:
      return {
        ...state,
        favourites: setFavouritesHelper(state, action.payload)
      };
    case LOAD_LOCAL_FAVOURITES:
      return {
        ...state,
        favourites: action.payload
      };
    default:
      return state;
  }
};

export default FavouriteReducer;
