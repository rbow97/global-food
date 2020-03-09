import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Favourites.css";
import Plate from "../icons/plate/Plate";
import Clock from "../icons/clock/Clock";

const Favourites = props => {
  let renderFavouritesInfo = null;
  renderFavouritesInfo = props.favouritesInfo.map(favouriteInfo => (
    <div className="favourite-card">
      <img
        className="favourite-card-image"
        src={` https://spoonacular.com/recipeImages/${favouriteInfo.image}`}
        alt={favouriteInfo.title}
      />

      <div className="favourite-card-text">
        <Link to={`/recipes/${favouriteInfo.id}`}>
          <p className="favourite-card-title">{favouriteInfo.title}</p>
        </Link>
        <div className="favourite-card-info">
          <Plate />
          <p>Serves: {favouriteInfo.servings}</p>
        </div>
        <div className="favourite-card-info">
          <Clock /> Ready in {favouriteInfo.readyInMinutes} minutes
        </div>
      </div>
    </div>
  ));

  return (
    <div className="favourites-container">
      <p className="favourites-container-title">Your Favourites</p>
      <div className="favourite-cards-container">{renderFavouritesInfo}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  favouritesInfo: state.FavouriteReducer.favourites
});

export default connect(mapStateToProps)(Favourites);
