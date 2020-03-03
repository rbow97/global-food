import "./Nav.css";
import React, { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import axios from "axios";

const Nav = props => {
  const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";
  const [search, setSearch] = useState("");

  const getRecipesFunction = async () => {
    props.setLoading(true);
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?query=${search}&number=1&apiKey=${APP_KEYrose}`
    );
    props.setRecipes(response.data.results);
    console.log(response);
    props.setLoading(false);
  };

  const getSearchFunction = e => {
    e.preventDefault();
    getRecipesFunction();
    props.getQuery(search);
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
