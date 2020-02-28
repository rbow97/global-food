import "./Nav.css";
import React, { useEffect, useState } from "react";
import Logo from "../logo/Logo";

const Nav = props => {
  const [search, setSearch] = useState("");

  const getSearchFunction = e => {
    e.preventDefault();
    props.getRecipes(search);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Logo />
        <h1 className="nav-title">Global Food</h1>
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
        <li>Discover</li>
        <li>Browse</li>
        <li>About</li>
      </ul>
    </nav>
  );
};

export default Nav;
