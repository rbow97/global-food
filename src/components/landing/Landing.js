import React, { useState } from "react";
import "./Landing.css";
import Picnic from "../../images/picnic.png";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import * as SearchActions from "../../actions/SearchActions";

const Landing = props => {
  const [search, setSearch] = useState("");
  // const [redirect, setRedirect] = useState(false);

  const getSearchFunction = e => {
    e.preventDefault();
    props.history.push(`/searchresults/${search}`);
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

const mapDispatchToState = dispatch => {
  return {
    saveSearch: searchValue => dispatch(SearchActions.fetchSearch(searchValue))
  };
};

export default connect(null, mapDispatchToState)(withRouter(Landing));
