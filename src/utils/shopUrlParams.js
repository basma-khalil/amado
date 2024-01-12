const shopUrlParams = ({
  query    = 'all',
  category = 'all',
  brands   = ['all'],
  colors   = ['all'],
  minPrice = process.env.REACT_APP_MIN_PRICE,
  maxPrice = process.env.REACT_APP_MAX_PRICE,
  sorting  = 'date',
  page     = 1,
} = {}) => {
  let paramsString = `/shop?query=${query}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sorting=${sorting}&page=${page}`;

  brands
    .join()
    .split(',')
    .forEach(
      (brand) => (paramsString += `&brand=${brand.split(' ').join('+')}`)
    );
  colors
    .join()
    .split(',')
    .forEach((color) => (paramsString += `&color=${color}`));

  return paramsString;
};

export default shopUrlParams;
