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
  // let [methodCheckListTotal, setMethodCheckListTotal] = useState(0);
  // let [ingredientsCheckListTotal, setIngredientsCheckListTotal] = useState(0);
  // const [ingredientsLog, setIngredientsLog] = useState({});
  // const [methodLog, setMethodLog] = useState({});

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
    // getLocalStorage();
  }, []);

  // const getLocalStorage = () => {
  //   const localObject = JSON.parse(localStorage.getItem("recipeStatus"));

  //   if (localObject) {
  //     if (localObject[props.match.params.id]) {
  //       setMethodLog(localObject[props.match.params.id].method);
  //       setIngredientsLog(localObject[props.match.params.id].ingredients);
  //     }
  //   }
  // };

  const getInfoFunction = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${props.match.params.id}/information?includeNutrition=true&apiKey=${APP_KEYrose}`
    );
    setInfo(response);
    setLoading(false);
    // console.log(response);
  };

  // const handleMethodCheckboxCount = e => {
  //   if (e.target.checked) {
  //     setMethodCheckListTotal(methodCheckListTotal + 1);
  //   } else if (!e.target.checked) {
  //     setMethodCheckListTotal(methodCheckListTotal - 1);
  //   }
  // };
  // const handleIngredientsCheckboxCount = e => {
  //   if (e.target.checked) {
  //     setIngredientsCheckListTotal(ingredientsCheckListTotal + 1);
  //   } else if (!e.target.checked) {
  //     setIngredientsCheckListTotal(ingredientsCheckListTotal - 1);
  //   }
  // };

  // const handleMethodLog = e => {
  //   let map = { ...methodLog };
  //   map[e.target.id] = e.target.checked;
  //   setMethodLog(map);
  //   updateLocalStorage(map, ingredientsLog);
  // };

  // const handleIngredientsLog = e => {
  //   let map = { ...ingredientsLog };
  //   map[e.target.id] = e.target.checked;
  //   setIngredientsLog(map);
  //   updateLocalStorage(methodLog, map);
  // };

  // const clearMethodHandler = () => {
  //   setMethodLog({});
  //   updateLocalStorage({}, ingredientsLog);
  // };

  // const updateLocalStorage = (method, ingredients) => {
  //   let localObject = {};
  //   let localObjectRaw = JSON.parse(localStorage.getItem("recipeStatus"));

  //   if (localObjectRaw === null) {
  //     localObject = {};
  //   } else {
  //     localObject = localObjectRaw;
  //   }

  //   console.log(method);
  //   localObject[props.match.params.id] = {
  //     method: method,
  //     ingredients: ingredients
  //   };

  //   localStorage.setItem("recipeStatus", JSON.stringify(localObject));
  // };

  let recipeInfo = null;
  // let steps;
  // let ingredients;
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
    // if (info.data.analyzedInstructions[0].steps) {
    //   steps = info.data.analyzedInstructions[0].steps.map(step => {
    //     const checked = methodLog[step.number];

    //     return (
    //       <div key={step.number} className="method-list-items">
    //         <label className="checkbox-label">
    //           <input
    //             defaultChecked={checked}
    //             id={step.number}
    //             type="checkbox"
    //             onClick={e => {
    //               handleMethodCheckboxCount(e);
    //               handleMethodLog(e);
    //             }}
    //           />
    //           <div className="checkbox-custom"></div>
    //           <p className="method-list-item" key={step.number}>
    //             <b>{step.number}</b> - {step.step}
    //           </p>
    //         </label>
    //       </div>
    //     );
    //   });
    // }
    // if (info.data.extendedIngredients) {
    // ingredients = info.data.extendedIngredients.map(ingredients => {
    //     const checked = ingredientsLog[ingredients.original];

    //     return (
    //       <div key={ingredients.original} className="ingredients-list-items">
    //         <label className="checkbox-label">
    //           <input
    //             className="checkbox"
    //             defaultChecked={checked}
    //             id={ingredients.original}
    //             type="checkbox"
    //             onClick={e => {
    //               handleIngredientsCheckboxCount(e);
    //               handleIngredientsLog(e);
    //             }}
    //           />
    //           <div className="checkbox-custom"></div>
    //           <p className="ingredients-list-item" key={ingredients.original}>
    //             {ingredients.original}
    //           </p>
    //         </label>
    //       </div>
    //     );
    //   });
    // }

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
      // const check = CheckDuplicateFavourite(recipe);

      props.saveFavourite(recipe);
      // localStorage.setItem(
      //   "favourites",
      //   JSON.stringify([...props.favourites, recipe])
      // );
    };

    let favouriteButton = (
      <button
        onClick={() => saveRecipeAsFavourite(props.location.state.recipe)}
        className="recipe-page-favourite-unsaved"
      >
        <p>Favourite</p>
        <EmptyStar />
      </button>
    );

    // console.log(props.location);

    if (props.favourites) {
      props.favourites.forEach(favourite => {
        const value = favourite.id;
        const favouriteString = value.toString();
        // console.log(favouriteString);
        if (favouriteString == props.match.params.id) {
          return (favouriteButton = (
            <button
              onClick={() => saveRecipeAsFavourite(props.location.state.recipe)}
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
        <RecipePageInfo
          info={info}
          // methodLog={methodLog}
          // ingredientsLog={ingredientsLog}
          // steps={steps}
          // ingredients={ingredients}
          // clearMethod={clearMethodHandler}
          // clearIngredients={clearIngredientsHandler}
        />
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
