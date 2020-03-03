import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Nav from "../nav/Nav";
import "./RecipePage.css";
import Star from "../star/Star";
import Egg from "../icons/egg/Egg";
import Clock from "../icons/clock/Clock";
import Plate from "../icons/plate/Plate";

const RecipePage = ({ match }) => {
  const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [nutrition, setNutrition] = useState({});
  let [methodCheckListTotal, setMethodCheckListTotal] = useState(0);
  let [ingredientsCheckListTotal, setIngredientsCheckListTotal] = useState(0);

  useEffect(() => {
    getInfoFunction();
  }, []);

  const getInfoFunction = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${match.params.id}/information?includeNutrition=true&apiKey=${APP_KEYjoe}`
    );
    setInfo(response);
    setLoading(false);
    console.log(response);
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleMethodCheckboxCount = e => {
    if (e.target.checked) {
      setMethodCheckListTotal(methodCheckListTotal + 1);
    } else if (!e.target.checked) {
      setMethodCheckListTotal(methodCheckListTotal - 1);
    }
  };
  const handleIngredientsCheckboxCount = e => {
    if (e.target.checked) {
      setIngredientsCheckListTotal(ingredientsCheckListTotal + 1);
    } else if (!e.target.checked) {
      setIngredientsCheckListTotal(ingredientsCheckListTotal - 1);
    }
  };

  let recipeInfo = null;
  let steps;
  let ingredients;
  let vegetarian;
  if (info.data) {
    // if (!info.data.vegetarian) {
    //   console.log("veggie test");
    //   vegetarian = <p className>Vegetarian: no</p>;
    // } else {
    //   vegetarian = <p>Vegetarian: yes</p>;
    // }
    if (info.data.analyzedInstructions[0].steps) {
      steps = info.data.analyzedInstructions[0].steps.map(step => (
        <div key={step.number} className="method-list-items">
          <label className="checkbox-label">
            <input
              type="checkbox"
              onClick={e => {
                handleMethodCheckboxCount(e);
              }}
            />
            <div className="checkbox-custom"></div>
            <p className="method-list-item" key={step.number}>
              <b>{step.number}</b> - {step.step}
            </p>
          </label>
        </div>
      ));
    }
    if (info.data.extendedIngredients) {
      ingredients = info.data.extendedIngredients.map(ingredients => (
        <div key={ingredients.original} className="ingredients-list-items">
          <label className="checkbox-label">
            <input
              type="checkbox"
              onClick={e => {
                handleIngredientsCheckboxCount(e);
              }}
            />
            <div className="checkbox-custom"></div>
            <p className="ingredients-list-item" key={ingredients.original}>
              {ingredients.original}
            </p>
          </label>
        </div>
      ));
    }

    recipeInfo = (
      <div className="recipe-page-wrapper">
        <div className="recipe-page-header">
          <img
            className="recipe-page-image"
            src={`https://spoonacular.com/recipeImages/${match.params.id}-312x231.jpg`}
            alt={info.data.title}
          />

          <div className="recipe-page-favourite">
            Favourite
            <Star />
          </div>
          <p className="recipe-page-title">{info.data.title}</p>

          <p className="recipe-page-servings">
            <Plate />
            Servings: 6
          </p>
          <p className="recipe-page-time">
            <Clock />
            Ready in 45 minutes
          </p>

          <p className="recipe-page-summary">
            {truncateString(info.data.summary.replace(/<[^>]*>/g, ""), 1000)}
          </p>
          {vegetarian}
        </div>
        <div className="recipe-page-method-ingredients">
          <div className=" recipe-page-method">
            <h1 className="recipe-page-instructions">
              Method{" "}
              {methodCheckListTotal ==
                info.data.analyzedInstructions[0].steps.length && (
                <span>- Enjoy your Food!</span>
              )}
            </h1>
            <div className="method-list">{steps}</div>
          </div>
          <div className="recipe-page-ingredients">
            <h1 className="recipe-page-instructions">
              Ingredients{" "}
              {ingredientsCheckListTotal ==
                info.data.extendedIngredients.length && (
                <span> - Prepped!</span>
              )}
            </h1>
            {ingredients}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Nav />
      <div>{loading ? <Egg /> : recipeInfo}</div>
    </Fragment>
  );
};

export default RecipePage;
