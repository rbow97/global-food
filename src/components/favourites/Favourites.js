import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TruncateString from "../../helpers/TruncateString";

import "./Favourites.css";
import Plate from "../icons/plate/Plate";
import Clock from "../icons/clock/Clock";
import ClearButton from "../icons/clearButton/ClearButton";

const Favourites = props => {
  console.log(props.favouritesInfo);
  let renderFavouritesInfo = null;
  renderFavouritesInfo = props.favouritesInfo.map(favouriteInfo => (
    <div key={favouriteInfo.id} className="favourite-card">
      <img
        className="favourite-card-image"
        src={` https://spoonacular.com/recipeImages/${favouriteInfo.image}`}
        alt={favouriteInfo.title}
      />
      <div className="favourite-card-text">
        <Link
          to={{
            state: { recipe: favouriteInfo },
            pathname: `/recipes/${favouriteInfo.id}`
          }}
        >
          <p className="favourite-card-title">
            {TruncateString(favouriteInfo.title, 25)}
          </p>
        </Link>
        <div className="favourite-card-info">
          <Plate />
          <p>Serves: {favouriteInfo.servings}</p>
        </div>
        <div className="favourite-card-info">
          <Clock /> Ready in {favouriteInfo.readyInMinutes} minutes
        </div>
      </div>
      <button className="clear-button-wrapper">
        <ClearButton />
      </button>
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
