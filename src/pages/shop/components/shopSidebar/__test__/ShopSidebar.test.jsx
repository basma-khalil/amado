import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../utils/testStoreUtils';
import ShopSidebar from '../ShopSidebar';

describe('ShopSidebar component', () => {
  global.scroll = jest.fn();
  const setSearchParams = jest.fn();
  const searchParams = { get: jest.fn() };

  beforeEach(
    () =>
      (global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })))
  );
  it('Should have the clear search button disabled when there is no search query', () => {
    renderWithProviders(
      <ShopSidebar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    );
    const showingMessage = screen.getByText(/clear search/i);
    expect(showingMessage).toBeInTheDocument();
  });

  it('Should extract the brands from the products', () => {
    renderWithProviders(
      <ShopSidebar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />,
      {
        products: [{ brand: 'brand' }],
      }
    );
    const brands = screen.getAllByText(/brand/i);
    expect(brands).toHaveLength(1);
  });
});
