import React, { Fragment } from "react";
import "./FavouritesCard.css";
import Star from "../star/Star";

const FavouritesCard = ({ favouriteProp }) => {
  return (
    <Fragment>
      <Star />
      <p className="favourites-selection">{favouriteProp}</p>
    </Fragment>
  );
};

export default FavouritesCard;
