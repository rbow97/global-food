import "./Nav.css";
import React from "react";
import Logo from "../logo/Logo";
import { Link, withRouter } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const Nav = props => {
  // const APP_KEYrose = "3bb40b484ae042bdbb10a1b038f5550a";
  // const APP_KEYjoe = "0aabbc9ce7f64cafb2b536729bc375b1";

  const placeholder = "Search...";
  const type = "normal";

  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="nav-logo">
          <Logo />
          <h1 className="nav-title">
            <Link to={`/`}>Global Food</Link>
          </h1>
        </div>
        {props.location.pathname === "/" ? null : (
          <SearchBar placeholder={placeholder} type={type} />
        )}
      </div>

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

export default withRouter(Nav);
