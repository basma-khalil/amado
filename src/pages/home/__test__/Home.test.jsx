import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../utils/testRouterUtils';
import * as productsAPI from '../../../services/firebase/firebaseSlice';
import Home from '../Home';
import Error from '../../error/Error';

const mockedGetProducts = jest.spyOn(productsAPI, 'useGetAllProductsQuery');

describe('Home component', () => {
  console.error = jest.fn(); // For Jest console error
  const product = {
    id   : 'product id',
    title: 'product title',
    price: 100,
    image: {
      original: 'image url',
    },
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should display the loader component when the API request is loading', async () => {
    mockedGetProducts.mockImplementation(() => ({
      data: null,
      isLoading: true,
      error: null,
    }));

    const loaderPortal = document.createElement('dive');
    loaderPortal.setAttribute('id', 'loader');
    document.body.appendChild(loaderPortal);

    renderWithRouter(<Home />);
    const loader = await screen.findByLabelText(/loading/i);
    expect(loader).toBeInTheDocument();
  });

  it('Should display the error component when an error occurs', async () => {
    mockedGetProducts.mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: { message: 'error message' },
    }));

    renderWithRouter({
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    });
    const errorMessage = await screen.findByText(
      /sorry, an unexpected error has occurred. please try again or go to another page./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should render the data after the API request is ready', async () => {
    let newProduct = { ...product };
    newProduct.id  = 'product id 2';
    const mockData = [product, newProduct];
    mockedGetProducts.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithRouter(<Home />);

    const productLink  = await screen.findAllByRole('link');
    const productImage = await screen.findAllByRole('img');
    const productPrice = await screen.findAllByText('from $100.00');
    const productName  = await screen.findAllByRole('heading', {
      name: /product title/i,
    });
    expect(productName).toHaveLength(mockData.length);
    expect(productPrice).toHaveLength(mockData.length);
    expect(productImage).toHaveLength(mockData.length);
    expect(productLink).toHaveLength(mockData.length);
  });
});
