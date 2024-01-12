import productsReducer, { storeProducts } from '../productsSlice';

describe('Products slice', () => {
  const initialState = { products: [] };

  it('Should return the initial state', () => {
    const previousState = undefined;
    const action = { type: undefined };
    const expectedState = initialState;

    expect(productsReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should toggle the state isOpen value', () => {
    const previousState = initialState;
    const action = storeProducts(['products']);
    const expectedState = { products: ['products'] };

    expect(productsReducer(previousState, action)).toEqual(expectedState);
  });
});
