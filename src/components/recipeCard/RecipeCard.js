import React, { useState, useEffect } from "react";
import "./RecipeCard.css";
import axios from "axios";
import Star from "../star/Star";
import Clock from "../icons/clock/Clock";
import Plate from "../icons/plate/Plate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as favouriteActions from "../../actions/FavouriteActions";

const RecipeCard = props => {
  const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  const [info, setInfo] = useState([]);

  // const getInfoFunction = async id => {
  //   const response = await axios.get(
  //     `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${APP_KEYrose}`
  //   );

  //   setInfo(response);
  //   console.log(response);
  // };

  // useEffect(() => {
  // getInfoFunction(id);
  // }, []);

  // const getTitleFunction = () => {
  //   getFavourites(title);
  // };

  const saveRecipeAsFavourite = recipe => {
    props.saveFavourite(recipe);
  };

  return (
    <div className="result-card">
      <div className="result-card-text">
        <Link to={`/recipes/${props.recipe.id}`}>
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
      <div className="result-card-favourite">
        <span
          className="result-card-favourite"
          onClick={recipe => saveRecipeAsFavourite(props.recipe)}
        >
          Favourite
          <Star />
        </span>
      </div>
      <Link to={`/recipes/${props.recipe.id}`}>
        <img
          className="result-card-image"
          src={` https://spoonacular.com/recipeImages/${props.recipe.image}`}
          alt={props.recipe.title}
        />
      </Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveFavourite: favouriteObject =>
      dispatch(favouriteActions.setFavourite(favouriteObject))
  };
};

export default connect(null, mapDispatchToProps)(RecipeCard);
