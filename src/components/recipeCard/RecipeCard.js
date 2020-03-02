import React, { useState, useEffect } from "react";
import "./RecipeCard.css";
import axios from "axios";
import Star from "../star/Star";
import Clock from "../icons/clock/Clock";
import Plate from "../icons/plate/Plate";
import RecipePage from "../recipePage/RecipePage";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, title, image, time, servings, getFavourites }) => {
  // const APP_KEY = "3bb40b484ae042bdbb10a1b038f5550a";
  const [info, setInfo] = useState([]);

  // const getInfoFunction = async id => {
  //   const response = await axios.get(
  //     `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${APP_KEY}`
  //   );
  //   setInfo(response);
  //   console.log(response);
  // };

  // useEffect(() => {
  //   getInfoFunction(id);
  // }, []);

  const getTitleFunction = () => {
    getFavourites(title);
  };

  return (
    <div className="result-card">
      <div className="result-card-text">
        <Link to={`/recipes/${id}`}>
          <p className="result-card-title">{title}</p>
        </Link>
        <div className="result-card-info">
          <Plate />
          <p>Serves: {servings}</p>
        </div>
        <div className="result-card-info">
          <Clock /> Ready in {time} minutes
        </div>
      </div>
      <div className="result-card-favourite">
        <a
          href="#"
          className="result-card-favourite"
          onClick={getTitleFunction}
        >
          Favourite
          <Star />
        </a>
      </div>
      <Link to={`/recipes/${id}`}>
        <img
          className="result-card-image"
          src={` https://spoonacular.com/recipeImages/${image}`}
          alt={title}
        />
      </Link>
    </div>
  );
};

export default RecipeCard;
