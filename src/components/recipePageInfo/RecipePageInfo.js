import React, { useState, useEffect } from "react";
import countArray from "../../helpers/countArray";
import "./RecipePageInfo.css";

import RemoveButton from "../icons/removeButton/RemoveButton";
import List from "../icons/list/List";

const RecipePageInfo = ({ info }) => {
  let [methodCheckListTotal, setMethodCheckListTotal] = useState(0);
  let [ingredientsCheckListTotal, setIngredientsCheckListTotal] = useState(0);
  const [methodLog, setMethodLog] = useState({});
  const [ingredientsLog, setIngredientsLog] = useState({});

  let steps;
  let ingredients;

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    const localObject = JSON.parse(localStorage.getItem("recipeStatus"));

    if (localObject) {
      if (localObject[info.data.id]) {
        setMethodLog(localObject[info.data.id].method);
        setIngredientsLog(localObject[info.data.id].ingredients);
      }
    }
  };

  const handleMethodLog = e => {
    let map = { ...methodLog };
    map[e.target.id] = e.target.checked;
    setMethodLog(map);
    updateLocalStorage(map, ingredientsLog);
  };

  const handleMethodCheckboxCount = e => {
    if (e.target.checked) {
      setMethodCheckListTotal(methodCheckListTotal + 1);
    } else if (!e.target.checked) {
      setMethodCheckListTotal(methodCheckListTotal - 1);
    }
  };

  const handleIngredientsLog = e => {
    let map = { ...ingredientsLog };
    map[e.target.id] = e.target.checked;
    setIngredientsLog(map);
    updateLocalStorage(methodLog, map);
  };

  const handleIngredientsCheckboxCount = e => {
    if (e.target.checked) {
      setIngredientsCheckListTotal(ingredientsCheckListTotal + 1);
    } else if (!e.target.checked) {
      setIngredientsCheckListTotal(ingredientsCheckListTotal - 1);
    }
  };

  const clearMethodHandler = () => {
    let map = { ...methodLog };
    for (let key in map) {
      map[key] = false;
    }

    setMethodCheckListTotal(0);
    setMethodLog(map);
    updateLocalStorage(map, ingredientsLog);
  };

  const clearIngredientsHandler = () => {
    let map = { ...ingredientsLog };
    for (let key in map) {
      map[key] = false;
    }

    setIngredientsCheckListTotal(0);
    setIngredientsLog(map);
    updateLocalStorage(methodLog, map);
  };

  const updateLocalStorage = (method, ingredients) => {
    let localObject = {};
    let localObjectRaw = JSON.parse(localStorage.getItem("recipeStatus"));

    if (localObjectRaw === null) {
      localObject = {};
    } else {
      localObject = localObjectRaw;
    }

    localObject[info.data.id] = {
      method: method,
      ingredients: ingredients
    };

    localStorage.setItem("recipeStatus", JSON.stringify(localObject));
  };

  if (info.data.analyzedInstructions[0].steps) {
    steps = info.data.analyzedInstructions[0].steps.map(step => {
      const checked = methodLog[step.number];

      return (
        <div key={step.number} className="method-list-items">
          <label className="checkbox-label">
            <input
              checked={checked || false}
              id={step.number}
              type="checkbox"
              onChange={e => {
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
    ingredients = info.data.extendedIngredients.map(ingredients => {
      const checked = ingredientsLog[ingredients.original];

      return (
        <div key={ingredients.original} className="ingredients-list-items">
          <label className="checkbox-label">
            <input
              className="checkbox"
              checked={checked || false}
              id={ingredients.original}
              type="checkbox"
              onChange={e => {
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

  return (
    <div className="recipe-page-method-ingredients">
      <div className=" recipe-page-method">
        <div className="recipe-page-instructions-header">
          <List />
          <span className="recipe-page-instructions-title">Method</span>
          <div className="recipe-page-message">
            {countArray(Object.values(methodLog)) ===
            info.data.analyzedInstructions[0].steps.length ? (
              <span>- Enjoy your Food!</span>
            ) : null}
            {countArray(Object.values(methodLog)) > 0 ? (
              <button
                onClick={() => clearMethodHandler()}
                className="recipe-page-message-button"
              >
                <RemoveButton />
              </button>
            ) : null}
          </div>
        </div>
        <div className="method-list">{steps}</div>
      </div>
      <div className="recipe-page-ingredients">
        <div className="recipe-page-instructions-header">
          <List />
          <span className="recipe-page-instructions-title">Ingredients</span>
          <div className="recipe-page-message">
            {countArray(Object.values(ingredientsLog)) ===
            info.data.extendedIngredients.length ? (
              <span>- Prepped!</span>
            ) : null}
            {countArray(Object.values(ingredientsLog)) > 0 ? (
              <button
                onClick={() => clearIngredientsHandler()}
                className="recipe-page-message-button"
              >
                <RemoveButton />
              </button>
            ) : null}
          </div>
        </div>
        <div className="ingredients-list">{ingredients}</div>
      </div>
    </div>
  );
};

export default RecipePageInfo;
