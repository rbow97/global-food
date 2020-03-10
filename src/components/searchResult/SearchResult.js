import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import RecipeCard from "../recipeCard/RecipeCard";
import FavouritesCard from "../favouritesCard/FavouritesCard";
import Landing from "../landing/Landing";
import Egg from "../icons/egg/Egg";
import { useParams } from "react-router-dom";
import "./SearchResult.css";
import * as SearchActions from "../../actions/SearchActions";

const SearchResult = props => {
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

  let { query } = useParams();
  useEffect(() => {
    getResults();
  }, [query]);

  const getResults = () => {
    props.saveSearch(query);
  };

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
      {props.loading ? (
        <Egg />
      ) : (
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
      )}
    </Fragment>
  );
};

const mapDispatchToState = dispatch => {
  return {
    saveSearch: searchValue => dispatch(SearchActions.fetchSearch(searchValue))
  };
};

const mapStateToProps = state => ({
  recipes: state.SearchReducer.searchValue,
  loading: state.SearchReducer.searching,
  query: state.SearchReducer.query
});

export default connect(mapStateToProps, mapDispatchToState)(SearchResult);
