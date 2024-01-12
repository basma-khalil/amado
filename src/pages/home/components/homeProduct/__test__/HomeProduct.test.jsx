import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../../../utils/testRouterUtils';
import HomeProduct from '../HomeProduct';

describe('HomeProduct component', () => {
  const product = {
    id   : 'product id',
    title: 'product title',
    price: 100,
    image: {
      original: 'image url',
    },
  };

  it('Should display the product title, image, price and link', () => {
    renderWithRouter(<HomeProduct product={product} />);
    const productLink  = screen.getByRole('link');
    const productImage = screen.getByRole('img');
    const productName  = screen.getByRole('heading', {
      name: /product title/i,
    });
    const productPrice = screen.getByText('from $100.00');

    expect(productLink).toHaveAttribute(
      'href',
      '/product/product-title/id=product id'
    );
    expect(productImage).toHaveAttribute('src', 'image url');
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
});
