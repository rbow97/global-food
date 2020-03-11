import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./FavouritesCard.css";
import TruncateString from "../../helpers/TruncateString";
import Star from "../star/Star";

const FavouritesCard = props => {
  let renderFavouriteName = null;
  if (props.favourites) {
    renderFavouriteName = props.favourites.map(favourite => (
      <Link
        className="favourites-card-link"
        key={favourite.id}
        to={{ pathname: `/recipes/${favourite.id}` }}
      >
        <Star />
        <p className="favourites-card-text">
          {TruncateString(favourite.title, 25)}
        </p>
      </Link>
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
