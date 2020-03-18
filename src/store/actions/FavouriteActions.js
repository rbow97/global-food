import { SET_FAVOURITE, LOAD_LOCAL_FAVOURITES } from "./types";

export const setFavourite = favouriteObject => {
  return {
    type: SET_FAVOURITE,
    payload: favouriteObject
  };
};

export const loadLocalFavourites = favouriteArray => {
  return {
    type: LOAD_LOCAL_FAVOURITES,
    payload: favouriteArray
  };
};
