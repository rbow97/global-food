import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as FavouriteActions from "../../actions/FavouriteActions";
import axios from "axios";
import "./RecipePage.css";
import RecipePageInfo from "../recipePageInfo/RecipePageInfo";
import TruncateString from "../../helpers/TruncateString";
import CheckDuplicateFavourite from "../../helpers/CheckDuplicateFavourite";

import EmptyStar from "../icons/emptyStar/EmptyStar";
import Star from "../star/Star";
import Egg from "../icons/egg/Egg";
import Clock from "../icons/clock/Clock";
import Plate from "../icons/plate/Plate";
import Vegetable from "../icons/vegetable/Vegetable";

const RecipePage = props => {
  const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // {recipeId: {
  //   ingredients: {
  //     uid: true
  //     uid: true
  //   },
  //   method: {
  //     uid: true
  //     uid: true
  //   }
  // }}

  useEffect(() => {
    getInfoFunction();
  }, []);

  const getInfoFunction = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${props.match.params.id}/information?includeNutrition=true&apiKey=${APP_KEYrose}`
    );
    setInfo(response);
    setLoading(false);
    console.log(response);
  };

  let recipeInfo = null;
  let vegetarian;
  if (info.data) {
    if (!info.data.vegetarian) {
      vegetarian = (
        <div className="recipe-page-vegetarian">
          <Vegetable />
          <p>Vegetarian: No</p>
        </div>
      );
    } else {
      vegetarian = (
        <div className="recipe-page-vegetarian">
          <Vegetable />
          <p>Vegetarian: Yes</p>
        </div>
      );
    }

    let renderNutrients = null;
    const nutrientsArr = info.data.nutrition.nutrients;

    if (nutrientsArr) {
      renderNutrients = nutrientsArr.map(el => {
        if (
          el.title === "Calories" ||
          el.title === "Fat" ||
          el.title === "Protein" ||
          el.title === "Sugar"
        ) {
          return (
            <li key={el.title} className="nutrition-element">
              <p>{el.title}</p>
              <p>
                {Math.round(el.amount)} {el.unit}
              </p>
            </li>
          );
        }
        if (el.title === "Carbohydrates") {
          return (
            <li key={el.title} className="nutrition-element">
              <p>{"Carbs"}</p>
              <p>
                {Math.round(el.amount)} {el.unit}
              </p>
            </li>
          );
        }
      });
    }

    let renderImage = null;
    if (info.data.imageType === "jpg") {
      renderImage = (
        <img
          className="recipe-page-image"
          src={`https://spoonacular.com/recipeImages/${props.match.params.id}-312x231.jpg`}
          alt={info.data.title}
        />
      );
    } else if (info.data.imageType === "png") {
      renderImage = (
        <img
          className="recipe-page-image"
          src={`https://spoonacular.com/recipeImages/${props.match.params.id}-312x231.png`}
          alt={info.data.title}
        />
      );
    }

    const saveRecipeAsFavourite = recipe => {
      props.saveFavourite(recipe);
    };

    let favouriteButton = (
      <button
        // onClick={() => saveRecipeAsFavourite(props.location.state.recipe)}
        onClick={() => saveRecipeAsFavourite(info.data)}
        className="recipe-page-favourite-unsaved"
      >
        <p>Favourite</p>
        <EmptyStar />
      </button>
    );

    // Adding functionality to 'favourite' button
    if (props.favourites) {
      props.favourites.forEach(favourite => {
        const value = favourite.id;

        const favouriteString = value.toString();
        if (favouriteString == props.match.params.id) {
          console.log(info.data);
          return (favouriteButton = (
            <button
              // from Favourites component
              // onClick={() => saveRecipeAsFavourite(props.location.state.recipe)}
              onClick={() => saveRecipeAsFavourite(info.data)}
              className="recipe-page-favourite-saved"
            >
              <p>Favourite</p>
              <Star />
            </button>
          ));
        }
      });
    }

    recipeInfo = (
      <div className="recipe-page-wrapper">
        <div className="recipe-page-header">
          <p className="recipe-page-title">{info.data.title}</p>
          {renderImage}
          {favouriteButton}
          <p className="recipe-page-servings">
            <Plate />
            <span>Servings: {info.data.servings}</span>
          </p>
          <p className="recipe-page-time">
            <Clock />
            <span>Ready in {info.data.readyInMinutes} minutes</span>
          </p>

          {vegetarian}
          <div className="nutrition-all">
            <p className="nutrition-title">Nutrition per serving:</p>
            <ul className="nutrition-elements">{renderNutrients}</ul>
          </div>
          <p className="recipe-page-summary">
            {TruncateString(info.data.summary.replace(/<[^>]*>/g, ""), 1000)}
          </p>
        </div>
        <RecipePageInfo info={info} />
      </div>
    );
  }

  return (
    <Fragment>
      <div>{loading ? <Egg /> : recipeInfo}</div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  favourites: state.FavouriteReducer.favourites
});

const mapDispatchToProps = dispatch => {
  return {
    saveFavourite: favourite =>
      dispatch(FavouriteActions.setFavourite(favourite))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecipePage));
