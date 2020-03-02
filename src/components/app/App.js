import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "../nav/Nav";
import Browse from "../browse/Browse";
import SearchResult from "../searchResult/SearchResult";
import RecipeCard from "../recipeCard/RecipeCard";
import RecipePage from "../recipePage/RecipePage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={SearchResult} />
          <Route path="/browse" component={Browse} />
          <Route path="/recipes/:id" component={RecipePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
