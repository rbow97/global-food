import "./App.css";
import React from "react";
import SearchResult from "../searchResult/SearchResult";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <SearchResult />
    </div>
  );
};

export default App;
