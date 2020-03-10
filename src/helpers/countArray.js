const countArray = arr => {
  let total = 0;
  arr.forEach(el => {
    if (el === true) {
      total++;
    }
  });
  return total;
};

export default countArray;
