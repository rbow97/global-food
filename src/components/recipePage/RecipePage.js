import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Nav from "../nav/Nav";

import Egg from "../icons/egg/Egg";

const RecipePage = ({ match }) => {
  const APP_KEY = "3bb40b484ae042bdbb10a1b038f5550a";
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfoFunction();
  }, []);

  const getInfoFunction = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${match.params.id}/information?includeNutrition=false&apiKey=${APP_KEY}`
    );
    setInfo(response);
    setLoading(false);
    console.log(response);
    console.log(info);
  };

  return (
    <Fragment>
      <Nav />
      <div>{loading ? <Egg /> : <p>{info.data.title}</p>}</div>
    </Fragment>
  );
};

export default RecipePage;
