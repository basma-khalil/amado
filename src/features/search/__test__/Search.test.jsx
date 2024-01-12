import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../utils/testStoreUtils';
import Search from '../Search';
import { Sidebar } from '../../../components';
import styles from '../Search.module.scss';

describe('Search component', () => {
  const searchBtn = jest.fn();

  it('Should change the search form input value when the user types', () => {
    renderWithProviders(
      <BrowserRouter>
        <Search searchBtn={searchBtn} />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText(/Type your keyword/i);
    fireEvent.change(searchInput, { target: { value: 'search query' } });
    expect(searchInput).toHaveValue('search query');
  });

  it('Should reset the search form input value when the user submits', () => {
    renderWithProviders(
      <BrowserRouter>
        <Search searchBtn={searchBtn} />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText(/Type your keyword/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    expect(searchInput).toHaveValue('');
  });

  it('Should display the search container when the sidebar search button is clicked', () => {
    renderWithProviders(
      <BrowserRouter>
        <Search searchBtn={searchBtn} />
        <Sidebar searchBtn={searchBtn} />
      </BrowserRouter>
    );
    const searchContainer = screen.getByTestId(/search container/i);
    const searchButtons = screen.getAllByRole('button', { name: /search/i });
    fireEvent.click(searchButtons[1]);
    expect(searchContainer).toHaveClass(styles['open-search']);
  });
});
