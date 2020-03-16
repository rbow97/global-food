import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ToggleNav.css";

const ToggleNav = () => {
  return (
    <div>
      <ul className="toggle-nav-links">
        <li>
          <Link to={`/discover`}>Discover</Link>
        </li>
        <li>
          <Link to={`/favourites`}>Favourites</Link>
        </li>
        <li>
          <Link href={`/about`}>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default ToggleNav;
