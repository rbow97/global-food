import React from "react";
import "./Landing.css";
import Picnic from "../../images/picnic.png";

const Landing = () => {
  return (
    <div className="home-main-section">
      <div className="image-wrapper">
        {/* <div className="image-food"></div> */}
        <img className="picnic-image" src={Picnic} alt="Picnic" />
      </div>
      <div className="subtitle-1">
        <p>Find your Flavour</p>
      </div>
      <input className="home-search-bar" type="text" placeholder="search..." />

      <div className="subtitle-2">
        <p>Browse thousands of recipes.</p>
        <p>Favourite, edit and share.</p>
      </div>
    </div>
  );
};

export default Landing;
