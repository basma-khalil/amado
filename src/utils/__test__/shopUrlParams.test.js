import shopUrlParams from '../shopUrlParams';

describe('shopUrlParams function', () => {
  const maxPrice = process.env.REACT_APP_MAX_PRICE;
  const minPrice = process.env.REACT_APP_MIN_PRICE;
  const params   = {
    query   : 'query',
    category: 'category',
    minPrice: minPrice,
    maxPrice: maxPrice,
    sorting : 'sorting',
    page    : 'page',
    brands  : ['brand1', 'brand2'],
    colors  : ['color1', 'color2'],
  };

  it('Should return the shop URL with the default params', () => {
    const tested   = shopUrlParams();
    const expected = `/shop?query=all&category=all&minPrice=${minPrice}&maxPrice=${maxPrice}&sorting=date&page=1&brand=all&color=all`;
    expect(tested).toEqual(expected);
  });

  it('Should return the shop URL with the given params values', () => {
    const tested   = shopUrlParams(params);
    const expected = `/shop?query=query&category=category&minPrice=${minPrice}&maxPrice=${maxPrice}&sorting=sorting&page=page&brand=brand1&brand=brand2&color=color1&color=color2`;
    expect(tested).toEqual(expected);
  });
});
