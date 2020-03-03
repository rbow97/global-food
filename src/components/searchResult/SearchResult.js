import React, { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../recipeCard/RecipeCard";
import FavouritesCard from "../favouritesCard/FavouritesCard";
import Landing from "../landing/Landing";
import Nav from "../nav/Nav";
import Egg from "../icons/egg/Egg";
import "./SearchResult.css";

const SearchResult = () => {
  // const APP_ID = "de983b0c";
  const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState([]);

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

  const getQuery = query => {
    setQuery(query);
  };

  let renderRecipes = null;
  renderRecipes = recipes.map(recipe => (
    <RecipeCard
      getFavourites={getFavouritesFunction}
      key={recipe.id}
      id={recipe.id}
      title={recipe.title}
      image={recipe.image}
      time={recipe.readyInMinutes}
      servings={recipe.servings}
    />
  ));

  let renderFavourites = null;
  renderFavourites = favourites.map(favourite => (
    <FavouritesCard key={favourite} favouriteProp={favourite} />
  ));

  return (
    <Fragment>
      <Nav
        setLoading={setLoading}
        setRecipes={setRecipes}
        getQuery={getQuery}
      />
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
        <Egg />
      ) : (
        <Landing />
      )}
    </Fragment>
  );
};

export default SearchResult;
