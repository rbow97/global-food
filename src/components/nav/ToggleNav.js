import React from "react";
import { Link } from "react-router-dom";
import "./ToggleNav.css";

const ToggleNav = props => {
  return (
    <div>
      <ul className="toggle-nav-links">
        <li>
          <Link to={`/discover`} onClick={props.click}>
            Discover
          </Link>
        </li>
        <li>
          <Link to={`/favourites`} onClick={props.click}>
            Favourites
          </Link>
        </li>
        <li>
          <Link to={`/about`} onClick={props.click}>
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ToggleNav;
