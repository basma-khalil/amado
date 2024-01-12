import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { toggleSearch, closeSearch, setQuery } = searchSlice.actions;
export default searchSlice.reducer;
