import React, { useState } from "react";
import "./RecipeCard.css";
import "../icons/emptyStar/EmptyStar.css";
import axios from "axios";
import Star from "../star/Star";
import EmptyStar from "../icons/emptyStar/EmptyStar";
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

  const checkDuplicateFavourite = recipe => {
    const recipes = JSON.parse(localStorage.getItem("favourites"));
    let check = true;
    if (recipes) {
      recipes.forEach(el => {
        if (el.id === recipe.id) {
          check = false;
        }
      });
    }
    return check;
  };

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
        <button
          className="result-card-favourite-contents"
          onClick={() => saveRecipeAsFavourite(props.recipe)}
        >
          Favourite
          <EmptyStar />
        </button>
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
