import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Discover.css";
import DiscoverSearchBar from "../discoverSearchBar/DiscoverSearchBar";
import DiscoverCarousel from "../discoverCarousel/DiscoverCarousel";
import * as SearchActions from "../../store/actions/SearchActions";

const Discover = props => {
  const placeholder = "pasta, brocolli";
  const discover = "discover";
  const cuisine = "cuisine";

  useEffect(() => {
    props.callVegetarian();
    props.callVegan();
    props.callPescetarian();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <DiscoverSearchBar placeholder={placeholder} type={discover} />
        </div>
      </div>
      <div className="discover-section-1">
        <div className="discover-popular-vegetarian-wrapper">
          <div className="discover-popular-vegetarian discover-popular">
            <p className="discover-popular-vegetarian-text">
              Popular Vegetarian Dishes
            </p>
            <DiscoverCarousel type={"vegetarian"} />
          </div>
        </div>
        <div className="discover-search-by-cuisine-wrapper">
          <div className="discover-search-by-cuisine">
            <p className="discover-search-by-cuisine-title">
              Browse by Cuisine
            </p>
            <DiscoverSearchBar placeholder={"Chinese"} type={cuisine} />
            <p className="discover-search-by-cuisine-subtitle">
              Find your favourite recipes from cultures around the world, and
              maybe discover some new ones!
            </p>
          </div>
        </div>
      </div>

      <div className="discover-section-2">
        <div className="discover-popular-vegan discover-popular">
          <p className="discover-popular-vegan-text">Popular Vegan Dishes</p>
          <DiscoverCarousel type={"vegan"} />
        </div>

        <div className="discover-popular-pescetarian discover-popular">
          <p className="discover-popular-pescetarian-text">
            Popular Pescetarian Dishes
          </p>
          <DiscoverCarousel type={"pescetarian"} />
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
    callVegetarian: () => dispatch(SearchActions.fetchSearchVegetarian()),
    callVegan: () => dispatch(SearchActions.fetchSearchVegan()),
    callPescetarian: () => dispatch(SearchActions.fetchSearchPescetarian())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
