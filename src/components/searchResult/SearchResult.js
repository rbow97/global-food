import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import RecipeCard from "../recipeCard/RecipeCard";
import FavouritesCard from "../favouritesCard/FavouritesCard";
import Egg from "../icons/egg/Egg";
import { useParams } from "react-router-dom";
import "./SearchResult.css";
import * as SearchActions from "../../store/actions/SearchActions";

const SearchResult = props => {
  let { query, type } = useParams();

  useEffect(() => {
    getResults();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  console.log(type);

  const getResults = () => {
    if (type === "discover") {
      props.saveSearchDiscover(query);
    } else if (type === "normal") {
      props.saveSearch(query);
    } else if (type === "cuisine") {
      props.saveSearchCuisine(query);
      props.saveSearch(query);
    }
  };

  let renderRecipes = null;
  if (props.recipes) {
    renderRecipes = props.recipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} type={type} />
    ));
  }

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
    saveSearch: searchValue => dispatch(SearchActions.fetchSearch(searchValue)),
    saveSearchDiscover: searchValue =>
      dispatch(SearchActions.fetchSearchByIngredients(searchValue)),
    saveSearchCuisine: searchValue =>
      dispatch(SearchActions.fetchSearchCuisine(searchValue))
  };
};

const mapStateToProps = state => ({
  recipes: state.SearchReducer.searchValue,
  loading: state.SearchReducer.searching,
  query: state.SearchReducer.query
});

export default connect(mapStateToProps, mapDispatchToState)(SearchResult);
