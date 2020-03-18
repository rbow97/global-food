import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import FavouriteReducer from "./FavouriteReducer";

const RootReducer = combineReducers({
  SearchReducer,
  FavouriteReducer
});

export default RootReducer;
