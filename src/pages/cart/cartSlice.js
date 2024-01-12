import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('amadoCart')
  ? JSON.parse(localStorage.getItem('amadoCart'))
  : {
      cartItems: [],
      delivery: 0,
      cartTotalQty: 0,
      cartSubtotalPrice: 0,
      cartTotalPrice: 0,
    };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExistItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (isExistItem) {
        isExistItem.cartQty += action.payload.quantity;
      } else {
        const {
          id,
          title,
          image: { sizes },
          price,
          color,
          quantity,
        } = action.payload;
        
        const newItem = {
          id,
          title,
          imageUrl: sizes['166X166'],
          price,
          color,
          cartQty: quantity,
        };
        state.cartItems.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      const isExistItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      action.payload.cartQty > 1
        ? (isExistItem.cartQty -= 1)
        : (state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ));
    },

    getTotals: (state) => {
      const freeDeliveryLimit = 300;
      const delivery = 30;

      let subtotalPrice = 0;
      let totalQty = 0;

      state.cartItems.forEach((cartItem) => {
        totalQty += cartItem.cartQty;
        subtotalPrice += cartItem.price * cartItem.cartQty;
      });

      state.cartTotalQty = totalQty;
      state.cartSubtotalPrice = subtotalPrice;

      if (state.cartSubtotalPrice === 0) {
        state.cartTotalPrice = 0;
        state.delivery = 0;
      } else if (state.cartSubtotalPrice > freeDeliveryLimit) {
        state.cartTotalPrice = state.cartSubtotalPrice;
        state.delivery = 'free';
      } else {
        state.cartTotalPrice = state.cartSubtotalPrice + delivery;
        state.delivery = delivery;
      }
      localStorage.setItem('amadoCart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
