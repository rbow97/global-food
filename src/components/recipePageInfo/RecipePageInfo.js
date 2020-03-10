import React from "react";
import countArray from "../../helpers/countArray";
import "./RecipePageInfo.css";
import List from "../icons/list/List";

const RecipePageInfo = ({
  info,
  ingredients,
  steps,
  methodLog,
  ingredientsLog
}) => {
  return (
    <div className="recipe-page-method-ingredients">
      <div className=" recipe-page-method">
        <h1 className="recipe-page-instructions">
          <List />
          <span className="recipe-page-instructions-title">Method</span>
          {countArray(Object.values(methodLog)) ===
          info.data.analyzedInstructions[0].steps.length ? (
            <span className="recipe-page-message">- Enjoy your Food!</span>
          ) : null}
        </h1>
        <div className="method-list">{steps}</div>
      </div>
      <div className="recipe-page-ingredients">
        <h1 className="recipe-page-instructions">
          <List />
          <span className="recipe-page-instructions-title">Ingredients</span>
          {countArray(Object.values(ingredientsLog)) ===
          info.data.extendedIngredients.length ? (
            <span className="recipe-page-message"> - Prepped!</span>
          ) : null}
        </h1>
        {ingredients}
      </div>
    </div>
  );
};

export default RecipePageInfo;
