import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../utils/testStoreUtils';
import Checkout from '../Checkout';

describe('Checkout component', () => {
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
  const checkoutAction = jest.fn();
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Checkout />,
      action: checkoutAction,
    },
  ]);
  beforeEach(() => {
    checkoutAction.mockReturnValue(null);
  });
  afterEach(cleanup);

  it('Should display the order summary', () => {
    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: {
        cart: cart,
      },
    });
    const cartSubtotal = screen.getByText('$100.00');
    const cartDelivery = screen.getByText('$30.00');
    const cartTotal = screen.getByText('$130.00');

    expect(cartSubtotal).toBeInTheDocument();
    expect(cartDelivery).toBeInTheDocument();
    expect(cartTotal).toBeInTheDocument();
  });

  it('Should not submit the checkout form if the form entries are not filled out', () => {
    const user = userEvent.setup();
    renderWithProviders(<RouterProvider router={router} />);
    const submitButton = screen.getByRole('button', {
      name: /checkout/i,
    });
    user.click(submitButton);
    expect(checkoutAction).not.toHaveBeenCalled();
  });

  it('Should submit the checkout form if the form entries are filled out', async () => {
    const user = userEvent.setup();

    renderWithProviders(<RouterProvider router={router} />);

    // const checkoutForm = screen.getByRole('form');
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    const companyInput = screen.getByRole('textbox', {
      name: /company name/i,
    });
    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const countrySelect = screen.getByRole('combobox');
    const countryOption = screen.getByRole('option', {
      name: /united states/i,
    });
    const addressInput = screen.getByRole('textbox', {
      name: /address/i,
    });
    const townInput = screen.getByRole('textbox', {
      name: /town/i,
    });
    const zipInput = screen.getByRole('spinbutton', {
      name: /zip code/i,
    });
    const phoneInput = screen.getByRole('textbox', {
      name: /phone no/i,
    });
    const textarea = screen.getByRole('textbox', {
      name: /leave a comment about your order/i,
    });
    const createAccountCheckbox = screen.getByRole('checkbox', {
      name: /create an account/i,
    });
    // const differentAddressCheckbox = screen.getByRole('checkbox', {
    //   name: /ship to a different address/i,
    // });
    const paymentMethod = screen.getByRole('radio', {
      name: /cash On Delivery/i,
    });
    const submitButton = screen.getByRole('button', {
      name: /checkout/i,
    });

    await user.type(firstNameInput, 'first name');
    await user.type(lastNameInput, 'last name');
    await user.type(companyInput, 'company name');
    await user.type(emailInput, 'user@test.com');
    await user.click(countrySelect);
    await user.click(countryOption);
    await user.type(addressInput, 'address');
    await user.type(townInput, 'town');
    await user.type(zipInput, '123');
    await user.type(phoneInput, '123456789');
    await user.type(textarea, 'comment');
    await user.click(createAccountCheckbox);
    await user.click(paymentMethod);
    await user.click(submitButton);

    expect(firstNameInput).toHaveValue('first name');
    expect(lastNameInput).toHaveValue('last name');
    expect(companyInput).toHaveValue('company name');
    expect(emailInput).toHaveValue('user@test.com');
    expect(countrySelect).toHaveValue('united states');
    expect(addressInput).toHaveValue('address');
    expect(townInput).toHaveValue('town');
    expect(zipInput).toHaveValue(123);
    expect(phoneInput).toHaveValue('123456789');
    expect(textarea).toHaveValue('comment');
    expect(createAccountCheckbox).toBeChecked();
    expect(paymentMethod).toBeChecked();
    expect(checkoutAction).toHaveBeenCalledTimes(1);
  });
});
