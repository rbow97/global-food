import React, { Fragment } from "react";
import "./FavouritesCard.css";
import Star from "../star/Star";

const FavouritesCard = ({ favouriteProp }) => {
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Fragment>
      <div className="favourites-selection">
        <Star />
        {truncateString(favouriteProp, 20)}
      </div>
    </Fragment>
  );
};

export default FavouritesCard;
