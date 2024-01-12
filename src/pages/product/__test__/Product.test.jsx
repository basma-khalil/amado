import { fireEvent, screen } from '@testing-library/react';
import {
  useParams,
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { renderWithProviders } from '../../../utils/testStoreUtils';
import { useGetSingleProductQuery } from '../../../services/firebase/firebaseSlice';
import Product from '../Product';
import { Slider, Rating, ToastNotification } from '../../../lib';
import Error from '../../error/Error';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
jest.mock('../../../services/firebase/firebaseSlice', () => ({
  ...jest.requireActual('../../../services/firebase/firebaseSlice'),
  useGetSingleProductQuery: jest.fn(),
}));
jest.mock('../../../lib/components/slider/Slider.jsx');
jest.mock('../../../lib/components/rating/Rating.jsx');

describe('Product component', () => {
  console.error = jest.fn(); // For Jest console error
  const product = {
    id: 'product id',
    title: 'product title',
    price: 100,
    color: 'product color',
    description: 'product description',
    category: ['product category1', 'product category2'],
    rating: 0,
    inStock: 100,
    image: {
      sizes: {
        '166X166': 'product image',
      },
      details: {
        img1: 'product image1',
        img2: 'product image2',
        img3: 'product image3',
        img4: 'product image4',
      },
    },
  };
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Product />,
      errorElement: <Error />,
    },
  ]);
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should display the loader component when the API request is loading', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    useGetSingleProductQuery.mockImplementation(() => ({
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
    useParams.mockReturnValue({ id: 'id=product-id' });

    useGetSingleProductQuery.mockImplementation(() => ({
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

  it('Should display the data after the API request is ready', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    const mockData = product;
    useGetSingleProductQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(<RouterProvider router={router} />);

    const productPrice = await screen.findByText('$100.00');
    const productStock = await screen.findByText(/in stock/i);
    const productDescription = await screen.findByText(/product description/);
    const productName = await screen.findByRole('heading', {
      name: /product color product title/i,
    });
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productStock).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
  });

  it('Should have the add to cart button disabled if the product is out of stock', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    let outOfStockProduct = { ...product };
    outOfStockProduct.inStock = 0;
    const mockData = outOfStockProduct;
    useGetSingleProductQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(<RouterProvider router={router} />);

    const addToCartBtn = await screen.findByRole('button', {
      name: /add to cart/i,
    });
    expect(addToCartBtn).toBeDisabled();
  });

  it('Should display the toast message if the add to cart button is clicked and the product quantity is equal to 0', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    const mockData = product;
    useGetSingleProductQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <Product />
      </BrowserRouter>
    );
    const addToCartBtn = await screen.findByRole('button', {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartBtn);
    const toastMessage = await screen.findByText(
      'please select the product quantity'
    );
    expect(toastMessage).toBeInTheDocument();
  });

  it('Should display the toast message if the add to cart button is clicked and the product quantity is more than 0', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    const mockData = product;
    useGetSingleProductQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <Product />
      </BrowserRouter>
    );
    const increaseButton = await screen.findByRole('button', {
      name: /increase/i,
    });
    const addToCartBtn = await screen.findByRole('button', {
      name: /add to cart/i,
    });
    fireEvent.click(increaseButton);
    fireEvent.click(addToCartBtn);
    const toastMessage = await screen.findByText(
      `${product.title} has been added to your cart`
    );
    expect(toastMessage).toBeInTheDocument();
  });

  it('Should call the "Slider" component with the given props', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    const mockData = product;
    useGetSingleProductQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    const productImages = [];
    Object.keys(product.image.details).forEach((img) =>
      productImages.push({
        original: product.image.details[img],
        thumbnail: product.image.details[img],
        originalAlt: product.title,
        thumbnailAlt: product.title,
      })
    );

    renderWithProviders(<RouterProvider router={router} />);

    expect(Slider).toHaveBeenNthCalledWith(
      1,
      {
        sliderImages: productImages,
      },
      {}
    );
  });

  it('Should call the "Rating" component with the given props', async () => {
    useParams.mockReturnValue({ id: 'id=product-id' });

    const mockData = product;
    useGetSingleProductQuery.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderWithProviders(<RouterProvider router={router} />);

    expect(Rating).toHaveBeenNthCalledWith(
      1,
      {
        ratingStars: 0,
        ratingSetStars: expect.any(Function),
        ratingDisabled: false,
      },
      {}
    );
  });
});
