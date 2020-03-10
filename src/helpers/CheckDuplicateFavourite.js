const CheckDuplicateFavourite = recipe => {
  const recipes = JSON.parse(localStorage.getItem("favourites"));
  let check = true;
  if (recipes) {
    recipes.forEach(el => {
      if (el.id === recipe.id) {
        check = false;
      }
    });
  }
  return true;
};

export default CheckDuplicateFavourite;
