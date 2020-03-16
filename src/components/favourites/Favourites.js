import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TruncateString from "../../helpers/TruncateString";
import * as FavouriteActions from "../../actions/FavouriteActions";

import "./Favourites.css";
import Plate from "../icons/plate/Plate";
import Clock from "../icons/clock/Clock";
import RemoveButton from "../icons/removeButton/RemoveButton";

const Favourites = props => {
  const removeRecipeAsFavourite = recipe => {
    props.removeFavourite(recipe);
  };

  const imageSelection = favouriteInfo => {
    let imageType = null;
    if (favouriteInfo.image.includes("https://")) {
      imageType = (
        <img
          className="favourite-card-image"
          src={favouriteInfo.image}
          alt={favouriteInfo.title}
        />
      );
    } else {
      imageType = (
        <img
          className="favourite-card-image"
          src={` https://spoonacular.com/recipeImages/${favouriteInfo.image}`}
          alt={favouriteInfo.title}
        />
      );
    }
    return imageType;
  };

  let renderFavouritesInfo = null;
  renderFavouritesInfo = props.favouritesInfo.map(favouriteInfo => (
    <div key={favouriteInfo.id} className="favourite-card">
      {imageSelection(favouriteInfo)}
      {/* <img
        className="favourite-card-image"
        src={` https://spoonacular.com/recipeImages/${favouriteInfo.image}`}
        src={favouriteInfo.image}
        alt={favouriteInfo.title}
      /> */}
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
      <button
        onClick={() => removeRecipeAsFavourite(favouriteInfo)}
        className="clear-button-wrapper"
      >
        <RemoveButton />
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

const mapDispatchToProps = dispatch => {
  return {
    removeFavourite: favourite =>
      dispatch(FavouriteActions.setFavourite(favourite))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
