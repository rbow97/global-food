import React, { useState } from "react";
import { connect } from "react-redux";
import * as SearchActions from "../../actions/SearchActions";
import "./Landing.css";
import Picnic from "../../images/picnic.png";

const Landing = props => {
  const [search, setSearch] = useState("");

  const getSearchFunction = e => {
    e.preventDefault();
    props.saveSearch(search);
    console.log("search");
  };

  return (
    <div className="home-main-section">
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
        <p>Favourite, edit and share.</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveSearch: searchValue => dispatch(SearchActions.fetchSearch(searchValue))
  };
};

export default connect(null, mapDispatchToProps)(Landing);
