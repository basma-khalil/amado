import searchReducer, { toggleSearch, closeSearch, setQuery } from '../searchSlice';

describe('Search slice', () => {
  const initialState = {isOpen: false, query: ''};

  it('Should return the initial state', () => {
    const previousState = undefined;
    const action        = { type: undefined };
    const expectedState = initialState;

    expect(searchReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should toggle the state isOpen value', () => {
    const previousState = initialState;
    const action        = toggleSearch();
    const expectedState = {isOpen: true, query: ''};

    expect(searchReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should set the state isOpen value to be false', () => {
    const previousState = {isOpen: true, query: ''};
    const action        = closeSearch();
    const expectedState = {isOpen: false, query: ''};

    expect(searchReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should set the state query value to be the action payload', () => {
    const previousState = {isOpen: true, query: ''};
    const action        = setQuery('search query');
    const expectedState = {isOpen: true, query: 'search query'};

    expect(searchReducer(previousState, action)).toEqual(expectedState);
  });
});
