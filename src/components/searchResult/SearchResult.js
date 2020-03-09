import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import RecipeCard from "../recipeCard/RecipeCard";
import FavouritesCard from "../favouritesCard/FavouritesCard";
import Landing from "../landing/Landing";
import Nav from "../nav/Nav";
import Egg from "../icons/egg/Egg";
import "./SearchResult.css";

const SearchResult = props => {
  // const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // const getFavouritesFunction = title => {
  //   const newFavourites = [...favourites];
  //   // Check for duplicates
  //   if (newFavourites.includes(title)) {
  //     console.log("error");
  //   } else {
  //     // Add new if not a duplicate
  //     newFavourites.push(title);
  //   }
  //   // Set state
  //   setFavourites(newFavourites);
  //   console.log(favourites);
  // };

  let renderRecipes = null;
  if (props.recipes) {
    renderRecipes = props.recipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
  }

  // let renderFavourites = null;
  // renderFavourites = favourites.map(favourite => (
  //   <FavouritesCard key={favourite} favouriteProp={favourite} />
  // ));

  return (
    <Fragment>
      {props.recipes.length > 0 ? (
        <div className="results-container">
          <div className="results-cards">
            <p className="results-for">Results for '{props.query}'</p>
            {renderRecipes}
          </div>
          <div className="results-favourites-wrapper">
            <div className="results-favourites">
              <p className="favourites-title">Your Favourites</p>
              <FavouritesCard />
            </div>
          </div>
        </div>
      ) : props.loading ? (
        <Egg />
      ) : (
        <Landing />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  recipes: state.SearchReducer.searchValue,
  loading: state.SearchReducer.searching,
  query: state.SearchReducer.query
});

export default connect(mapStateToProps)(SearchResult);
