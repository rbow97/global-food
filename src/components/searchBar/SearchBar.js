import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = props => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, []);

  const getSearchFunction = e => {
    e.preventDefault();
    props.history.push(`/searchresults/${search}/${props.type}`);
  };

  return (
    <div className="search-section">
      <form onSubmit={e => getSearchFunction(e)} className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder={props.placeholder}
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        {/* <a className="search-button" href="#">
          Search
        </a> */}
      </form>
    </div>
  );
};

export default withRouter(SearchBar);
