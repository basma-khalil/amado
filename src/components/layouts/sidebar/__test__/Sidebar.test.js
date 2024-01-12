import { screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../utils/testStoreUtils';
import Sidebar from '../Sidebar';

describe('Sidebar component', () => {
  const searchBtn = jest.fn();
  const cart = {
    cartTotalQty: 1,
  };

  it('Should display the cart items number', () => {
    renderWithProviders(
      <BrowserRouter>
        <Sidebar searchBtn={searchBtn} />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const cartLink    = screen.getAllByRole('link', { name: /cart/i });
    const cartItemsNo = within(cartLink[1]).getByText(`(${cart.cartTotalQty})`);
    expect(cartItemsNo).toBeInTheDocument();
  });
});
