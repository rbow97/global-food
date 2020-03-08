import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Browse from "../browse/Browse";
import SearchResult from "../searchResult/SearchResult";
import RecipePage from "../recipePage/RecipePage";
import Nav from "../nav/Nav";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
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
