import { SET_FAVOURITE, LOAD_LOCAL_FAVOURITES } from "../actions/types";

const initState = {
  favourites: []
};

const setFavouritesHelper = (state, favouriteObject) => {
  let newFavouritesArray = [...state.favourites];
  // Check for duplicates
  let check = false;
  newFavouritesArray.forEach(el => {
    if (el.id === favouriteObject.id) {
      return (check = true);
    }
  });

  if (check) {
    newFavouritesArray = newFavouritesArray.filter(
      el => el.id !== favouriteObject.id
    );
  } else {
    // Add new if not a duplicate
    newFavouritesArray.push(favouriteObject);
  }

  // Set local storage
  localStorage.setItem("favourites", JSON.stringify(newFavouritesArray));

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
