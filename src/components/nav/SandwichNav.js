import React from "react";
import "./SandwichNav.css";

const SandwichNav = props => {
  return (
    <div className="nav-toggle-button" onClick={props.click}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default SandwichNav;
