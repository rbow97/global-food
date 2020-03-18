import "./Nav.css";
import React, { useState, Fragment } from "react";
import Logo from "../logo/Logo";
import { Link, withRouter } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import SandwichNav from "./SandwichNav";
import ToggleNav from "./ToggleNav";
import Backdrop from "./Backdrop";

const Nav = props => {
  const placeholder = "Search...";
  const type = "normal";
  const [links, setLinks] = useState(false);

  const toggleClickHandler = () => {
    setLinks(!links);
  };

  let backdrop;
  let toggleNav;

  if (links) {
    backdrop = <Backdrop click={() => toggleClickHandler()} />;
    toggleNav = <ToggleNav click={() => toggleClickHandler()} />;
  }

  return (
    <Fragment>
      <nav className="nav">
        <div className="nav-left">
          <Link to={`/`}>
            <div className="nav-logo">
              <Logo />
              <h1 className="nav-title">Global Food</h1>
            </div>
          </Link>
          {props.location.pathname === "/" ? null : (
            <SearchBar placeholder={placeholder} type={type} />
          )}
        </div>
        <SandwichNav click={() => toggleClickHandler()} />
        {toggleNav}

        <ul className="nav-links">
          <li>
            <Link to={`/discover`}>Discover</Link>
          </li>
          <li>
            <Link to={`/favourites`}>Favourites</Link>
          </li>
          <li>
            <a href={`/about`}>About</a>
          </li>
        </ul>
      </nav>
      {backdrop}
    </Fragment>
  );
};

export default withRouter(Nav);
