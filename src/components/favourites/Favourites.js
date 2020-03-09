import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Favourites.css";
import Plate from "../icons/plate/Plate";
import Clock from "../icons/clock/Clock";

const Favourites = props => {
  let renderFavouritesInfo = null;
  renderFavouritesInfo = props.favouritesInfo.map(favouriteInfo => (
    <div className="favourites-container">
      <Link to={`/recipes/${favouriteInfo.id}`}>
        <p className="result-card-title">{favouriteInfo.title}</p>
      </Link>
      <div className="result-card-info">
        <Plate />
        <p>Serves: {favouriteInfo.servings}</p>
      </div>
      <div className="result-card-info">
        <Clock /> Ready in {favouriteInfo.readyInMinutes} minutes
      </div>
    </div>
  ));

  return <div>{renderFavouritesInfo}</div>;
};

const mapStateToProps = state => ({
  favouritesInfo: state.FavouriteReducer.favourites
});

export default connect(mapStateToProps)(Favourites);
