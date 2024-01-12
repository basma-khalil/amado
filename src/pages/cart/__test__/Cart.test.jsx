import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../utils/testStoreUtils';
import Cart from '../Cart';
import { ToastNotification } from '../../../lib';

describe('Cart component', () => {
  const product = {
    id: 'product id',
    title: 'product title',
    imageUrl: 'image url',
    price: 100,
    color: 'product color',
    cartQty: 1,
  };
  const cart = {
    cartItems: [product],
    delivery: 30,
    cartTotalQty: 1,
    cartSubtotalPrice: 100,
    cartTotalPrice: 130,
  };
  it('Should display the NoProductsFound component if the cart is empty', () => {
    renderWithProviders(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    const noProductsFound = screen.getByText(/your cart is currently empty/i);
    expect(noProductsFound).toBeInTheDocument();
  });

  it('Should display the cart items', () => {
    renderWithProviders(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const productImage = screen.getByRole('img');
    const productName = screen.getByRole('heading', {
      name: /product color product title/i,
    });
    expect(productImage).toHaveAttribute('src', 'image url');
    expect(productName).toBeInTheDocument();
  });

  it('Should display the order summary', () => {
    renderWithProviders(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const cartDelivery = screen.getByText('$30.00');
    const cartTotal = screen.getByText('$130.00');

    expect(cartDelivery).toBeInTheDocument();
    expect(cartTotal).toBeInTheDocument();
  });

  it('Should navigate to the checkout page if the go to checkout link is clicked', () => {
    renderWithProviders(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const checkoutLink = screen.getByRole('link', { name: /go to checkout/i });
    expect(checkoutLink).toHaveAttribute('href', '/checkout');
  });

  it('Should display the toast message if the increase button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <Cart />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const increaseButton = screen.getByRole('button', {
      name: /increase/i,
    });
    fireEvent.click(increaseButton);
    const toastMessage = await screen.findByText(
      `${product.title} has been added to your cart`
    );
    expect(toastMessage).toBeInTheDocument();
  });

  it('Should display the toast message if the decrease button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ToastNotification />
        <Cart />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const decreaseButton = screen.getByRole('button', {
      name: /decrease/i,
    });
    fireEvent.click(decreaseButton);
    const toastMessage = await screen.findByText(
      `${product.title} has been removed from your cart`
    );
    expect(toastMessage).toBeInTheDocument();
  });

  it('Should remove the product from cart if the product quantity is 1 and the decrease button is clicked', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
      {
        preloadedState: {
          cart: cart,
        },
      }
    );
    const productName = screen.getByRole('heading', {
      name: /product color product title/i,
    });
    const decreaseButton = screen.getByRole('button', {
      name: /decrease/i,
    });
    fireEvent.click(decreaseButton);
    expect(productName).not.toBeInTheDocument();
  });
});
