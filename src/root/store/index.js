import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApiSlice } from '../../services/firebase/firebaseSlice';
import productsReducer from './commonSlices/productsSlice';
import sidebarReducer from '../../components/layouts/sidebar/sidebarSlice';
import searchReducer from '../../features/search/searchSlice';
import cartReducer from '../../pages/cart/cartSlice';
import favoriteReducer from '../../pages/favorite/favoriteSlice';

export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    products: productsReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

setupListeners(store.dispatch);
