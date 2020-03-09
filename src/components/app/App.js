import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as SearchActions from "../../actions/SearchActions";
import * as FavouriteActions from "../../actions/FavouriteActions";

import SearchResult from "../searchResult/SearchResult";
import Favourites from "../favourites/Favourites";
import Landing from "../landing/Landing";
import RecipePage from "../recipePage/RecipePage";
import Nav from "../nav/Nav";

const App = props => {
  const setStateFromLocalStorage = () => {
    const localFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (localFavourites) {
      props.loadLocalFavourites(localFavourites);
    }
  };

  useEffect(() => {
    setStateFromLocalStorage();
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/searchresults/:query" component={SearchResult} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/recipes/:id" component={RecipePage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveSearch: searchValue => dispatch(SearchActions.fetchSearch(searchValue)),
    loadLocalFavourites: favouritesArray =>
      dispatch(FavouriteActions.loadLocalFavourites(favouritesArray))
  };
};

export default connect(null, mapDispatchToProps)(App);
