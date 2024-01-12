import favoriteReducer, {
  toggleToFavorite,
  removeFromFavorite,
} from '../favoriteSlice';

describe('Favorite slice', () => {
  const initialState = {favoriteItems: []};

  const product = {
    id     : 'product id',
    title  : 'product title',
    image  : { sizes: { '166X166': 'image url' } },
    price  : 100,
    color  : 'product color',
    inStock: 100,
  };

  const newItem = {
    id      : product.id,
    title   : product.title,
    imageUrl: product.image.sizes['166X166'],
    price   : product.price,
    color   : product.color,
    inStock : product.inStock,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('Should return the initial state', () => {
    const previousState = undefined;
    const action        = { type: undefined };
    const expectedState = initialState;

    expect(favoriteReducer(previousState, action)).toEqual(expectedState);
  });

  // it('Should return the localStorage favorite items', () => {
  //   localStorage.setItem('amadoFavorite', JSON.stringify([newItem]));

  //   const previousState = undefined;
  //   const action        = { type: undefined };
  //   const expectedState = JSON.parse(localStorage.getItem('amadoFavorite'));

  //   expect(favoriteReducer(previousState, action)).toEqual(expectedState);
  // });

  it('Should add the action payload to the state favoriteItems if the product does not exist', () => {
    const previousState = initialState;
    const action        = toggleToFavorite(product);
    const expectedState = {favoriteItems: [newItem]};
    expect(favoriteReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should remove the action payload from the state favoriteItems if the product exists', () => {
    const previousState = {favoriteItems: [newItem]};
    const action        = toggleToFavorite(product);
    const expectedState = initialState;
    expect(favoriteReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should remove the action payload from the state favoriteItems', () => {
    const previousState = {favoriteItems: [newItem]};
    const action        = removeFromFavorite(product);
    const expectedState = initialState;
    expect(favoriteReducer(previousState, action)).toEqual(expectedState);
  });
});
