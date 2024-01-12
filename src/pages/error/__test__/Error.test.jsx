import { fireEvent, screen } from '@testing-library/react';
import { Link } from 'react-router-dom';
import Error from '../Error';
import { renderWithRouter } from '../../../utils/testRouterUtils';

describe('Error component', () => {
  console.error = jest.fn(); // For Jest console error

  it('Should display the error message', async () => {
    renderWithRouter({
      path: '/',
      element: <Link to="test">link</Link>,
      errorElement: <Error />,
    });
    const link = screen.getByRole('link', { name: /link/i });
    fireEvent.click(link);
    const errorMessage = screen.getByText(/404 - not found/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
