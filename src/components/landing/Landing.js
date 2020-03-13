import React, { useState } from "react";
import "./Landing.css";
import Picnic from "../../images/picnic.png";
import { withRouter } from "react-router";

const Landing = props => {
  const [search, setSearch] = useState("");

  const type = "normal";

  const getSearchFunction = e => {
    e.preventDefault();
    props.history.push(`/searchresults/${search}/${type}`);
  };

  return (
    <div className="home-main-section">
      <div className="background-image"></div>
      <div className="image-wrapper">
        <img className="picnic-image" src={Picnic} alt="Picnic" />
      </div>
      <div className="subtitle-1">
        <p>Find your Flavour</p>
      </div>
      <form onSubmit={getSearchFunction}>
        <input
          className="home-search-bar"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="search..."
        />
      </form>

      <div className="subtitle-2">
        <p>Browse thousands of recipes.</p>
        <p>Explore food from around the world.</p>
      </div>
    </div>
  );
};

export default withRouter(Landing);
