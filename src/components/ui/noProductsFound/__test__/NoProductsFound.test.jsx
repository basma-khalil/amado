import { render, screen } from '@testing-library/react';
import NoProductsFound from '../NoProductsFound';

describe('NoProductsFound component', () => {
  it('Should have the given class', () => {
    render(<NoProductsFound message={'no products found message'} />);
    const NoProductsMessage = screen.getByText(/no products found message/i);
    expect(NoProductsMessage).toBeInTheDocument();
  });
});
