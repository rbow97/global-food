import React, { useEffect, useState, Fragment } from "react";
import RecipeCard from "../recipeCard/RecipeCard";
import FavouritesCard from "../favouritesCard/FavouritesCard";
import Nav from "../nav/Nav";
import axios from "axios";
import Landing from "../landing/Landing";
import "./SearchResult.css";

const SearchResult = () => {
  const APP_ID = "de983b0c";
  const APP_KEY = "cd0a09c9ca596e51da6d4be387d0df0f";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getRecipesFunction = async query => {
    setLoading(true);
    setQuery(query);
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
    console.log(response.data.hits[0].recipe.healthLabels[0]);
    setLoading(false);
  };

  const getFavouritesFunction = title => {
    const newFavourites = [...favourites];
    // Check for duplicates
    if (newFavourites.includes(title)) {
      console.log("error");
    } else {
      // Add new if not a duplicate
      newFavourites.push(title);
    }
    // Set state
    setFavourites(newFavourites);
    console.log(favourites);
  };

  let renderRecipes = null;
  renderRecipes = recipes.map(recipe => (
    <RecipeCard
      getFavourites={getFavouritesFunction}
      key={recipe.recipe.label}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      labels={recipe.recipe.healthLabels}
    />
  ));

  let renderFavourites = null;
  renderFavourites = favourites.map(favourite => (
    <FavouritesCard key={favourite} favouriteProp={favourite} />
  ));

  return (
    <Fragment>
      <Nav getRecipes={getRecipesFunction} />
      {recipes.length > 0 ? (
        <div className="results-container">
          <div className="results-cards">
            <p className="results-for">Results for '{query}'</p>
            {renderRecipes}
          </div>
          <div className="results-favourites-wrapper">
            <div className="results-favourites">
              <p className="favourites-title">Your Favourites</p>
              {renderFavourites}
            </div>
          </div>
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <Landing />
      )}
    </Fragment>
  );
};

export default SearchResult;
