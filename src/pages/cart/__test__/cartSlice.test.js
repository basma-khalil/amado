import cartReducer, { addToCart, removeFromCart, getTotals } from '../cartSlice';

describe('Cart slice', () => {
  const initialState = {
    cartItems        : [],
    delivery         : 0,
    cartTotalQty     : 0,
    cartSubtotalPrice: 0,
    cartTotalPrice   : 0,
  };

  const product = {
    id      : 'product id',
    title   : 'product title',
    image   : {sizes: {'166X166': 'image url'}},
    price   : 100,
    color   : 'product color',
    quantity: 1,
  }

  const newItem = {
    id      : product.id,
    title   : product.title,
    imageUrl: product.image.sizes['166X166'],
    price   : product.price,
    color   : product.color,
    cartQty : product.quantity,
  };

  it('Should return the initial state', () => {
    const previousState = undefined;
    const action        = { type: undefined };
    const expectedState = initialState;

    expect(cartReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should add the action payload to the state cartItems if the product does not exist', () => {
    const previousState = initialState;
    const action        = addToCart(product);
    const expectedState = {
      cartItems        : [newItem],
      delivery         : 0,
      cartTotalQty     : 0,
      cartSubtotalPrice: 0,
      cartTotalPrice   : 0,
    };

    expect(cartReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should increase the product quantity if the action payload exists in the state cartItems', () => {
    const previousState = {
      cartItems        : [newItem],
      delivery         : 0,
      cartTotalQty     : 0,
      cartSubtotalPrice: 0,
      cartTotalPrice   : 0,
    };
    const action        = addToCart(product);
    const expectedState = cartReducer(previousState, action);
    const existProduct  = expectedState.cartItems.find(
      item => item.id === newItem.id
    );

    expect(existProduct.cartQty).toEqual(2);
  });

  it('Should remove the action payload from the state cartItems if the product exists', () => {
    const previousState = {
      cartItems        : [newItem],
      delivery         : 0,
      cartTotalQty     : 0,
      cartSubtotalPrice: 0,
      cartTotalPrice   : 0,
    };
    const action        = removeFromCart(newItem);
    const expectedState = initialState;

    expect(cartReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should decrease the product quantity if the action payload exists in the state cartItems', () => {
    let item            = {...newItem};
    item.cartQty        = 2;
    const previousState = {
      cartItems        : [item],
      delivery         : 0,
      cartTotalQty     : 0,
      cartSubtotalPrice: 0,
      cartTotalPrice   : 0,
    };
    const action        = removeFromCart(item);
    const expectedState = cartReducer(previousState, action);
    const existProduct  = expectedState.cartItems.find(
      cartItem => cartItem.id === item.id
    );

    expect(existProduct.cartQty).toEqual(1);
  });

  it('Should get the state total values if there are no products in the cart', () => {
    const previousState = initialState;
    const action        = getTotals();
    const expectedState = initialState;

    expect(cartReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should get the state total values if there are products in the cart and the total price is smaller than the free delivery limit', () => {
    const previousState = {
      cartItems        : [newItem],
      delivery         : 0,
      cartTotalQty     : 0,
      cartSubtotalPrice: 0,
      cartTotalPrice   : 0,
    };
    const action        = getTotals();
    const expectedState = {
      cartItems        : [newItem],
      delivery         : 30,
      cartTotalQty     : 1,
      cartSubtotalPrice: 100,
      cartTotalPrice   : 130,
    };

    expect(cartReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should get the state total values if there are products in the cart and the total price greater than the freeDeliveryLimit', () => {
    const previousState = {
      cartItems        : [newItem, newItem, newItem, newItem],
      delivery         : 0,
      cartTotalQty     : 0,
      cartSubtotalPrice: 0,
      cartTotalPrice   : 0,
    };
    const action        = getTotals();
    const expectedState = {
      cartItems        : [newItem, newItem, newItem, newItem],
      delivery         : 'free',
      cartTotalQty     : 4,
      cartSubtotalPrice: 400,
      cartTotalPrice   : 400,
    };

    expect(cartReducer(previousState, action)).toEqual(expectedState);
  });
});
