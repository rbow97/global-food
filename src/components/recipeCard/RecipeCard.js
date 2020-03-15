import React from "react";
import "./RecipeCard.css";
import "../icons/emptyStar/EmptyStar.css";
import checkDuplicateFavourite from "../../helpers/CheckDuplicateFavourite";
import Star from "../star/Star";
import EmptyStar from "../icons/emptyStar/EmptyStar";
import Clock from "../icons/clock/Clock";
import Plate from "../icons/plate/Plate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as favouriteActions from "../../actions/FavouriteActions";

const RecipeCard = props => {
  // Adding functionality to 'favourite' button
  const saveRecipeAsFavourite = recipe => {
    const check = checkDuplicateFavourite(recipe);

    if (check) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...props.favourites, recipe])
      );
      props.saveFavourite(recipe);
    }
  };

  let favouriteButton = (
    <button
      onClick={() => saveRecipeAsFavourite(props.recipe)}
      className="result-card-favourite-unsaved"
    >
      <p>Favourite</p>
      <EmptyStar />
    </button>
  );

  if (props.favourites) {
    props.favourites.forEach(favourite => {
      const value = favourite.id;
      const favouriteString = value.toString();

      if (favouriteString == props.recipe.id) {
        return (favouriteButton = (
          <button
            onClick={() => saveRecipeAsFavourite(props.recipe)}
            className="result-card-favourite-saved"
          >
            <p>Favourite</p>
            <Star />
          </button>
        ));
      }
    });
  }

  let recipeImage = null;

  if (props.type === "normal" || props.type === "cuisine") {
    recipeImage = (
      <Link to={`/recipes/${props.recipe.id}`}>
        <img
          className="result-card-image"
          src={` https://spoonacular.com/recipeImages/${props.recipe.image}`}
          alt={props.recipe.title}
        />
      </Link>
    );
  } else if (props.type === "discover") {
    recipeImage = (
      <Link to={`/recipes/${props.recipe.id}`}>
        <img
          className="result-card-image"
          src={`${props.recipe.image}`}
          alt={props.recipe.title}
        />
      </Link>
    );
  }

  return (
    <div className="result-card">
      <div className="result-card-text">
        <Link
          to={{
            state: { recipe: props.recipe },
            pathname: `/recipes/${props.recipe.id}`
          }}
        >
          <p className="result-card-title">{props.recipe.title}</p>
        </Link>
        <div className="result-card-info">
          <Plate />
          <p>Serves: {props.recipe.servings}</p>
        </div>
        <div className="result-card-info">
          <Clock /> Ready in {props.recipe.readyInMinutes} minutes
        </div>
      </div>
      {favouriteButton}
      {/* <div className="result-card-favourite">
        <button
          className="result-card-favourite-contents"
          onClick={() => saveRecipeAsFavourite(props.recipe)}
        >
          <p>Favourite</p>
          <EmptyStar />
        </button>
      </div> */}
      {/* <Link to={`/recipes/${props.recipe.id}`}>
        <img
          className="result-card-image"
          src={` https://spoonacular.com/recipeImages/${props.recipe.image}`}
          alt={props.recipe.title}
        />
      </Link> */}
      {recipeImage}
    </div>
  );
};

const mapStateToProps = state => ({
  favourites: state.FavouriteReducer.favourites
});

const mapDispatchToProps = dispatch => {
  return {
    saveFavourite: favouriteObject =>
      dispatch(favouriteActions.setFavourite(favouriteObject))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
