import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TruncateString from "../../helpers/TruncateString";
import "./Discover.css";
import * as SearchActions from "../../actions/SearchActions";

const Discover = props => {
  const [search, setSearch] = useState("");
  const [x, setX] = useState(0);
  const placeholder = "pasta, brocolli";
  const type = "discover";

  useEffect(() => {
    props.callVegetarian();
  }, []);

  const getSearchFunction = e => {
    e.preventDefault();
    props.history.push(`/searchresults/${search}/${type}`);
  };

  let renderVegetarianImages = null;
  renderVegetarianImages = props.popularVegetarian.map(
    (popVegetarian, index) => {
      return (
        <div
          className="popular-vegetarian-item"
          style={{ transform: `translateX(${x}%)` }}
        >
          <img
            key={popVegetarian.id}
            className={`popular-vegetarian-image-${index}`}
            src={popVegetarian.image}
            alt={popVegetarian.title}
          ></img>
          <p className="popular-vegetarian-title">
            {TruncateString(popVegetarian.title, 30)}
          </p>
        </div>
      );
    }
  );

  //carousel
  const goLeft = () => {
    x === 0 ? setX(-100 * (props.popularVegetarian.length - 1)) : setX(x + 200);
  };
  const goRight = () => {
    x === -100 * (props.popularVegetarian.length - 1) ? setX(0) : setX(x - 200);
  };

  return (
    <div className="discover-container">
      <div className="discover-header">
        <div className="discover-header-text">
          <p className="discover-title">Explore new recipes</p>
          <p className="discover-subtitle">
            Use our database of 2600+ ingredients, 360K+ recipes and 90K+
            products!
          </p>
        </div>
        <div className="discover-search-by-ingredients-section">
          <p className="discover-search-by-ingredients-title">
            Browse by Ingredients
          </p>
          <p className="discover-search-by-ingredients-subtitle">
            Find recipes based on the ingredients you have in your home.
          </p>
          <div className="discover-ssearch-by-ingredients-earchbar">
            <form onSubmit={getSearchFunction}>
              <input
                className="discover-search-bar"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder={placeholder}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="discover-section-1">
        <div className="discover-popular-vegetarian-wrapper">
          <div className="discover-popular-vegetarian">
            <div className="discover-popular-vegetarian-text">
              <h2>Popular Vegetarian Dishes</h2>
            </div>
            <div id="prevButton" onClick={goLeft}>
              Previous
            </div>
            <div id="nextButton" onClick={goRight}>
              Next
            </div>
            <div className="discover-popular-vegetarian-images">
              {renderVegetarianImages}
            </div>
          </div>
        </div>
      </div>

      <div className="discover-section-2">
        <h2>Popular Greek Dishes</h2>
      </div>
      <div className="discover-section-3">
        <div className="discover-search-by-cuisine">
          <h2>Browse by Cuisine</h2>
        </div>
        <div className="discover-popular-indian">
          <h2>Popular Indian Dishes</h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  popularVegetarian: state.SearchReducer.vegetarian
});

const mapDispatchToProps = dispatch => {
  return {
    callVegetarian: () => dispatch(SearchActions.fetchSearchVegetarian())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
