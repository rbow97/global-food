import "./Nav.css";
import React, { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as searchActions from "../../actions/SearchActions";

const Nav = props => {
  // const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  // const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";

  const [search, setSearch] = useState("");

  const getSearchFunction = e => {
    e.preventDefault();
    props.saveSearch(search);
    props.getQuery(search);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Logo />
        <h1 className="nav-title">
          <a href="#">Global Food</a>
        </h1>
      </div>
      <form onSubmit={getSearchFunction} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        <a className="search-button" href="#">
          Search
        </a>
      </form>
      <ul className="nav-links">
        <li>
          <Link to={`/discover`}>Discover</Link>
        </li>
        <li>
          <Link to={`/favourites`}>Favourites</Link>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveSearch: searchValue => dispatch(searchActions.fetchSearch(searchValue))
  };
};

export default connect(null, mapDispatchToProps)(Nav);
