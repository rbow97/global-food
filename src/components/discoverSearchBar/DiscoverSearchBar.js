import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const DiscoverSearchBar = props => {
  const [search, setSearch] = useState("");

  const getSearchFunction = e => {
    e.preventDefault();
    props.history.push(`/searchresults/${search}/${props.type}`);
  };

  return (
    <div className="discover-searchbar-wrapper">
      <form onSubmit={e => getSearchFunction(e)}>
        <input
          className="discover-searchbar"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder={props.placeholder}
        />
      </form>
    </div>
  );
};

export default withRouter(DiscoverSearchBar);
