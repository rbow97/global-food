import { SET_FAVOURITE } from "./types";

export const setFavourite = favouriteObject => {
  return {
    type: SET_FAVOURITE,
    payload: favouriteObject
  };
};
