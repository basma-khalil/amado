import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  // maxPrice: 1000,
  // minPrice: 10,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    storeProducts: (state, action) => {
      state.products = action.payload;
    },

    // GetPriceRang(state, action) {
    //   const { products } = action.payload;
    //   const productsPrices = [];
    //   products.map((product) => productsPrices.push(product.price));
    //   const max = Math.max(...productsPrices);
    //   const min = Math.min(...productsPrices);

    //   state.minPrice = min;
    //   state.maxPrice = max;
    // },
  },
});

export const { storeProducts } = productsSlice.actions;
export default productsSlice.reducer;
