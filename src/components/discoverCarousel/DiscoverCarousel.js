import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TruncateString from "../../helpers/TruncateString";
import "../discover/Discover.css";

const DiscoverCarousel = props => {
  const [x, setX] = useState(0);

  // VEGETARIAN
  let renderImages = null;

  if (props.type === "vegetarian") {
    renderImages = props.popularVegetarian.map((popVegetarian, index) => {
      console.log(popVegetarian);
      return (
        <div
          key={popVegetarian.title}
          className="popular-item"
          style={{ transform: `translateX(${x}%)` }}
        >
          <img
            key={popVegetarian.id}
            className={`popular-image`}
            src={popVegetarian.image}
            alt={popVegetarian.title}
          ></img>
          <Link
            className="popular-title"
            to={{
              state: { recipe: popVegetarian },
              pathname: `/recipes/${popVegetarian.id}`
            }}
          >
            {TruncateString(popVegetarian.title, 30)}
          </Link>
        </div>
      );
    });
  }

  if (props.type === "vegan") {
    renderImages = props.popularVegan.map((popVegan, index) => {
      return (
        <div
          key={popVegan.title}
          className="popular-item"
          style={{ transform: `translateX(${x}%)` }}
        >
          <img
            key={popVegan.id}
            className={`popular-image`}
            src={popVegan.image}
            alt={popVegan.title}
          ></img>
          <Link
            className="popular-title"
            to={{
              state: { recipe: popVegan },
              pathname: `/recipes/${popVegan.id}`
            }}
          >
            {TruncateString(popVegan.title, 30)}
          </Link>
        </div>
      );
    });
  }

  if (props.type === "pescetarian") {
    renderImages = props.popularPescetarian.map((popPescetarian, index) => {
      return (
        <div
          key={popPescetarian.title}
          className="popular-item"
          style={{ transform: `translateX(${x}%)` }}
        >
          <img
            key={popPescetarian.id}
            className={`popular-image`}
            src={popPescetarian.image}
            alt={popPescetarian.title}
          ></img>
          <Link
            className="popular-title"
            to={{
              state: { recipe: popPescetarian },
              pathname: `/recipes/${popPescetarian.id}`
            }}
          >
            {TruncateString(popPescetarian.title, 30)}
          </Link>
        </div>
      );
    });
  }

  //carousel
  const goLeft = () => {
    x === 0 ? setX(-200 * (props.popularVegetarian.length - 1)) : setX(x + 200);
  };
  const goRight = () => {
    x === -200 * (props.popularVegetarian.length - 1) ? setX(0) : setX(x - 200);
  };

  return (
    <div>
      <div id="prevButton" onClick={goLeft}></div>
      <div id="nextButton" onClick={goRight}></div>
      <div className="discover-popular-images">{renderImages}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  popularVegetarian: state.SearchReducer.vegetarian,
  popularVegan: state.SearchReducer.vegan,
  popularPescetarian: state.SearchReducer.pescetarian
});

export default connect(mapStateToProps)(DiscoverCarousel);
