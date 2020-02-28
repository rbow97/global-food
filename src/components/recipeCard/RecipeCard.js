import React from "react";
import "./RecipeCard.css";
import Star from "../star/Star";

const RecipeCard = ({ title, calories, image, labels, getFavourites }) => {
  let renderLabels = null;
  renderLabels = labels.map((label, index) => {
    if (index > 2) {
      return;
    } else {
      return <div key={label}>- {label}</div>;
    }
  });

  const getTitleFunction = () => {
    getFavourites(title);
  };

  return (
    <div className="result-card">
      <div className="result-card-text">
        <p className="result-card-title">{title}</p>
        {renderLabels}
      </div>
      <div className="result-card-calories-favourite">
        <p className="result-card-calories">calories: {Math.round(calories)}</p>
        <a
          href="#"
          className="result-card-favourite"
          onClick={getTitleFunction}
        >
          Favourite
          <ion-icon name="star"></ion-icon>
        </a>
      </div>
      <img className="result-card-image" src={image} alt="" />
    </div>
  );
};

export default RecipeCard;
