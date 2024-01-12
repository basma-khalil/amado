import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/testStoreUtils';
import App from '../App';

describe('App component', () => {
  global.scrollTo = jest.fn();

  it('Should render the App successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const logo = screen.getAllByRole('img', { name: /amado/i });
    expect(logo[0]).toBeInTheDocument();
  });
});
