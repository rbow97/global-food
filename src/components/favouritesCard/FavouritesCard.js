import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./FavouritesCard.css";
import TruncateString from "../../helpers/TruncateString";
import Star from "../star/Star";
import * as favouriteActions from "../../actions/FavouriteActions";

const FavouritesCard = props => {
  let renderFavouriteName = null;
  // console.log(props.favourites);
  if (props.favourites) {
    renderFavouriteName = props.favourites.map(favourite => (
      <li key={favourite.id}>
        <Star />
        {TruncateString(favourite.title, 20)}
      </li>
    ));
  }

  return (
    <div className="favourites-selection">
      <ul>{renderFavouriteName}</ul>
    </div>
  );
};

const mapStateToProps = state => ({
  favourites: state.FavouriteReducer.favourites
});

export default connect(mapStateToProps)(FavouritesCard);
