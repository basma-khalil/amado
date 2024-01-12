import { cleanup,fireEvent, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../utils/testStoreUtils';
import Favorite from '../Favorite';
import { ToastNotification } from '../../../lib';

describe('Favorite component', () => {
  const product = {
    id      : 'product id',
    title   : 'product title',
    imageUrl: 'image url',
    price   : 100,
    color   : 'product color',
    inStock : 100,
  };
  const favorite = {
    favoriteItems: [product],
  };
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(cleanup);

  it('Should display the NoProductsFound component if the favorite is empty', () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>
    );
    const noProductsFound = screen.getByText(
      /your favorite is currently empty/i
    );
    expect(noProductsFound).toBeInTheDocument();
  });

  it('Should display the favorite items', () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const productImage = screen.getByRole('img');
    const productName = screen.getByRole('heading', {
      name: /product color product title/i,
    });
    const productPrice = screen.getByRole('cell', {
      name: '$100.00',
    });
    expect(productImage).toHaveAttribute('src', 'image url');
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('Should display the toast message if the delete button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    const toastMessage = await screen.findByText(
      `${product.title} has been removed from your favorite`
    );
    expect(toastMessage).toBeInTheDocument();
  });

  it('Should remove the product from the favorite items if the delete button is clicked', () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const productName = screen.getByRole('heading', {
      name: /product color product title/i,
    });
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(productName).not.toBeInTheDocument();
  });

  it('Should remove the product from the favorite items and add it to the cart if the add to cart button is clicked', () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const productName = screen.getByRole('heading', {
      name: /product color product title/i,
    });
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
    expect(productName).not.toBeInTheDocument();
  });

  it('Should disable the add to cart Button if the product stock is empty', () => {
    let outOfStockProduct = { ...product };
    outOfStockProduct.inStock = 0;
    const newFavorite = {
      favoriteItems: [outOfStockProduct],
    };

    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: newFavorite,
        },
      }
    );
    const AddToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    expect(AddToCartButton).toBeDisabled();
  });

  it('Should display the add to cart tooltip for the cart icon if the product is in stock', () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const AddToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    const cartTooltip = within(AddToCartButton).getByText(/add to cart/i);
    expect(cartTooltip).toBeInTheDocument();
  });

  it('Should display the out of stock tooltip for the cart icon if the product is out of stock', () => {
    let outOfStockProduct = { ...product };
    outOfStockProduct.inStock = 0;
    const newFavorite = {
      favoriteItems: [outOfStockProduct],
    };

    renderWithProviders(
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: newFavorite,
        },
      }
    );
    const AddToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    const cartTooltip = within(AddToCartButton).getByText(/out of stock/i);
    expect(cartTooltip).toBeInTheDocument();
  });

  it('Should display the toast message if the add to cart button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <Favorite />
      </BrowserRouter>,
      {
        preloadedState: {
          favorite: favorite,
        },
      }
    );
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartButton);
    const toastMessage = await screen.findByText(
      `${product.title} has been added to your cart`
    );
    expect(toastMessage).toBeInTheDocument();
  });
});
