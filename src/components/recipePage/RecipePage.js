import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Nav from "../nav/Nav";
import "./RecipePage.css";
import Star from "../star/Star";
import Egg from "../icons/egg/Egg";
import Clock from "../icons/clock/Clock";
import Plate from "../icons/plate/Plate";
import Cook from "../icons/cook/Cook";
import List from "../icons/list/List";

const RecipePage = ({ match }) => {
  const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [nutrition, setNutrition] = useState({});
  let [methodCheckListTotal, setMethodCheckListTotal] = useState(0);
  let [ingredientsCheckListTotal, setIngredientsCheckListTotal] = useState(0);
  const [ingredientsLog, setIngredientsLog] = useState({});
  const [methodLog, setMethodLog] = useState({});

  // {recipeId: {
  //   ingredients: {
  //     uid: true
  //     uid: true
  //     uid: true
  //     uid: true
  //     uid: true
  //     uid: true
  //   },
  //   method: {
  //     uid: true
  //     uid: true
  //     uid: true
  //     uid: true
  //     uid: true
  //     uid: true

  //   }
  // }}

  useEffect(() => {
    getInfoFunction();
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    const localObject = JSON.parse(localStorage.getItem("recipeStatus"));
    if (localObject) {
      setMethodLog(localObject[match.params.id].method);
      setIngredientsLog(localObject[match.params.id].ingredients);
    }
  };

  const getInfoFunction = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${match.params.id}/information?includeNutrition=true&apiKey=${APP_KEYrose}`
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

  const handleMethodLog = e => {
    let map = { ...methodLog };
    map[e.target.id] = e.target.checked;
    setMethodLog(map);
    updateLocalStorage(map, ingredientsLog);
  };

  const handleIngredientsLog = e => {
    let map = { ...ingredientsLog };
    map[e.target.id] = e.target.checked;
    setIngredientsLog(map);
    updateLocalStorage(methodLog, map);
  };

  const updateLocalStorage = (method, ingredients) => {
    let localObject = {};

    localObject[match.params.id] = {
      method: method,
      ingredients: ingredients
    };

    localStorage.setItem("recipeStatus", JSON.stringify(localObject));
  };

  const countArray = arr => {
    console.log(arr);
    let total = 0;
    arr.forEach(el => {
      if (el === true) {
        total++;
      }
    });
    return total;
  };

  let recipeInfo = null;
  let steps;
  let ingredients;
  let vegetarian;
  if (info.data) {
    if (!info.data.vegetarian) {
      vegetarian = <p className="recipe-page-vegetarian">Vegetarian: no</p>;
    } else {
      vegetarian = <p>Vegetarian: yes</p>;
    }
    if (info.data.analyzedInstructions[0].steps) {
      steps = info.data.analyzedInstructions[0].steps.map(step => {
        const checked = methodLog[step.number];

        return (
          <div key={step.number} className="method-list-items">
            <label className="checkbox-label">
              <input
                defaultChecked={checked}
                id={step.number}
                type="checkbox"
                onClick={e => {
                  handleMethodCheckboxCount(e);
                  handleMethodLog(e);
                }}
              />
              <div className="checkbox-custom"></div>
              <p className="method-list-item" key={step.number}>
                <b>{step.number}</b> - {step.step}
              </p>
            </label>
          </div>
        );
      });
    }
    if (info.data.extendedIngredients) {
      ingredients = info.data.extendedIngredients.map((ingredients, index) => {
        const checked = ingredientsLog[ingredients.original];

        return (
          <div key={ingredients.original} className="ingredients-list-items">
            <label className="checkbox-label">
              <input
                defaultChecked={checked}
                id={ingredients.original}
                type="checkbox"
                onClick={e => {
                  handleIngredientsCheckboxCount(e);
                  handleIngredientsLog(e);
                }}
              />
              <div className="checkbox-custom"></div>
              <p className="ingredients-list-item" key={ingredients.original}>
                {ingredients.original}
              </p>
            </label>
          </div>
        );
      });
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
            <p>Favourite</p>
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
              <List />
              <span>Method</span>
              {countArray(Object.values(methodLog)) ==
              info.data.analyzedInstructions[0].steps.length ? (
                <span className="recipe-page-message">- Enjoy your Food!</span>
              ) : null}
            </h1>
            <div className="method-list">{steps}</div>
          </div>
          <div className="recipe-page-ingredients">
            <h1 className="recipe-page-instructions">
              <List />
              Ingredients{" "}
              {countArray(Object.values(ingredientsLog)) ==
              info.data.extendedIngredients.length ? (
                <span className="recipe-page-message"> - Prepped!</span>
              ) : null}
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
