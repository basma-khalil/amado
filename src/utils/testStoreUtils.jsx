import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { productsApiSlice } from '../services/firebase/firebaseSlice';
import sidebarReducer from '../components/layouts/sidebar/sidebarSlice';
import searchReducer from '../features/search/searchSlice';
import cartReducer from '../pages/cart/cartSlice';
import favoriteReducer from '../pages/favorite/favoriteSlice';
import productsReducer from '../root/store/commonSlices/productsSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        [productsApiSlice.reducerPath]: productsApiSlice.reducer,
        sidebar : sidebarReducer,
        search  : searchReducer,
        cart    : cartReducer,
        favorite: favoriteReducer,
        products: productsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApiSlice.middleware),
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
