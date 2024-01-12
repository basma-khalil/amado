import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteItems: localStorage.getItem('amadoFavorite')
    ? JSON.parse(localStorage.getItem('amadoFavorite'))
    : [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleToFavorite: (state, action) => {
      const isExistItem = state.favoriteItems.find(
        (favItem) => favItem.id === action.payload.id
      );
      if (isExistItem) {
        state.favoriteItems = state.favoriteItems.filter(
          (favItem) => favItem.id !== action.payload.id
        );
      } else {
        const {
          id,
          title,
          image: { sizes },
          price,
          color,
          inStock,
        } = action.payload;
        const newItem = { id, title, imageUrl: sizes['166X166'], price, color, inStock };
        state.favoriteItems.push(newItem);
      }
      localStorage.setItem(
        'amadoFavorite',
        JSON.stringify(state.favoriteItems)
      );
    },

    removeFromFavorite: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(
        (favItem) => favItem.id !== action.payload.id
      );
      localStorage.setItem(
        'amadoFavorite',
        JSON.stringify(state.favoriteItems)
      );
    },
  },
});

export const { toggleToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
