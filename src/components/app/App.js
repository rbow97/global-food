import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as FavouriteActions from "../../store/actions/FavouriteActions";

import SearchResult from "../searchResult/SearchResult";
import Discover from "../discover/Discover";
import Favourites from "../favourites/Favourites";
import Landing from "../landing/Landing";
import RecipePage from "../recipePage/RecipePage";
import Nav from "../nav/Nav";
import About from "../about/About";

const App = props => {
  const setStateFromLocalStorage = () => {
    const localFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (localFavourites) {
      props.loadLocalFavourites(localFavourites);
    }
  };

  useEffect(() => {
    setStateFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/searchresults/:query/:type" component={SearchResult} />
          <Route path="/discover" component={Discover} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/about" component={About} />
          <Route path="/recipes/:id" component={RecipePage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loadLocalFavourites: favouritesArray =>
      dispatch(FavouriteActions.loadLocalFavourites(favouritesArray))
  };
};

export default connect(null, mapDispatchToProps)(App);
