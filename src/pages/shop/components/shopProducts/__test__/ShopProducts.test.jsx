import { screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../../utils/testStoreUtils';
import { useGetAllProductsQuery } from '../../../../../services/firebase/firebaseSlice';
import ShopProducts from '../ShopProducts';
import Error from '../../../../error/Error';

jest.mock('../../../../../services/firebase/firebaseSlice', () => ({
  ...jest.requireActual('../../../../../services/firebase/firebaseSlice'),
  useGetAllProductsQuery: jest.fn(),
}));

describe('ShopProducts component', () => {
  console.error = jest.fn(); // For Jest console error
  const setSearchParams = jest.fn();
  const searchParams = { get: jest.fn(), getAll: jest.fn() };
  // const searchParams = {
  //   get: jest.fn().mockReturnValue({
  //     query   : 'all',
  //     category: 'all',
  //     minPrice: 10,
  //     maxPrice: 1000,
  //     sorting : 'date',
  //     page    : 1,
  //   }),
  //   getAll: jest.fn().mockReturnValue({
  //     brand: ['all'],
  //     color: ['all'],
  //   }),
  // };
  const router = createMemoryRouter([
    {
      path: '/',
      element: (
        <ShopProducts
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      ),
      errorElement: <Error />,
    },
  ]);
  const product = {
    id: 'product id',
    title: 'product title',
    price: 100,
    rating: 0,
    inStock: 100,
    category: ['product category'],
    brand: 'product brand',
    color: 'product color',
    image: {
      overlay: 'image overlay url',
      sizes: { '460X571': 'image size url' },
    },
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should display the loader component when the API request is loading', async () => {
    useGetAllProductsQuery.mockImplementation(() => ({
      data: null,
      isLoading: true,
      error: null,
    }));

    const loaderPortal = document.createElement('dive');
    loaderPortal.setAttribute('id', 'loader');
    document.body.appendChild(loaderPortal);

    renderWithProviders(<RouterProvider router={router} />);
    const loader = await screen.findByLabelText(/loading/i);
    expect(loader).toBeInTheDocument();
  });

  it('Should display the error component when an error occurs', async () => {
    useGetAllProductsQuery.mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: { message: 'error message' },
    }));

    renderWithProviders(<RouterProvider router={router} />);
    const errorMessage = await screen.findByText(
      /sorry, an unexpected error has occurred. Please try again or go to another page./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should display the noProductsFound if the data is empty', async () => {
    jest.spyOn(searchParams, 'get').mockImplementation((key) => {
      switch (key) {
        case 'query':
          return 'all';
        case 'minPrice':
          return 10;
        case 'maxPrice':
          return 1000;
        case 'sorting':
          return 'date';
        case 'category':
          return 'all';
        case 'page':
          return 1;
        default:
          return null;
      }
    });
    jest.spyOn(searchParams, 'getAll').mockImplementation((key) => {
      switch (key) {
        case 'brand':
          return ['all'];
        case 'color':
          return ['all'];
        default:
          return null;
      }
    });
    const mockData = [];
    useGetAllProductsQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(<RouterProvider router={router} />);
    const noProductsFound = await screen.findByText(/no products found/i);
    expect(noProductsFound).toBeInTheDocument();
  });

  it('Should display the data after the API request is ready', async () => {
    jest.spyOn(searchParams, 'get').mockImplementation((key) => {
      switch (key) {
        case 'query':
          return 'all';
        case 'minPrice':
          return 10;
        case 'maxPrice':
          return 1000;
        case 'sorting':
          return 'date';
        case 'category':
          return 'all';
        case 'page':
          return 1;
        default:
          return null;
      }
    });
    jest.spyOn(searchParams, 'getAll').mockImplementation((key) => {
      switch (key) {
        case 'brand':
          return ['all'];
        case 'color':
          return ['all'];
        default:
          return null;
      }
    });
    let newProduct = { ...product };
    newProduct.id = 'product id 2';
    const mockData = [product, newProduct];
    useGetAllProductsQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(<RouterProvider router={router} />);

    const productPrice = await screen.findAllByText('$100.00');
    const productName = await screen.findAllByRole('heading', {
      name: /product title/i,
    });
    expect(productName).toHaveLength(mockData.length);
    expect(productPrice).toHaveLength(mockData.length);
  });
});
