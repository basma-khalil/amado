import sidebarReducer, { toggleSidebar, closeSidebar } from '../sidebarSlice';

describe('Sidebar slice', () => {
  const initialState = { isOpen: false };

  it('Should return the initial state', () => {
    const previousState = undefined;
    const action        = { type: undefined };
    const expectedState = initialState;

    expect(sidebarReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should toggle the state isOpen value', () => {
    const previousState = initialState;
    const action        = toggleSidebar();
    const expectedState = { isOpen: true };

    expect(sidebarReducer(previousState, action)).toEqual(expectedState);
  });

  it('Should set the state isOpen value to be false', () => {
    const previousState = { isOpen: true };
    const action        = closeSidebar();
    const expectedState = { isOpen: false };

    expect(sidebarReducer(previousState, action)).toEqual(expectedState);
  });
});
