import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/testStoreUtils';
import RootLayout from '../RootLayout';

describe('RootLayout component', () => {
  global.scrollTo = jest.fn();

  it('Should render the header successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Should render the sidebar successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const aside = screen.getByRole('complementary');
    expect(aside).toBeInTheDocument();
  });

  it('Should render the main successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('Should render the newsletter successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const newsletter = screen.getByRole('heading', {
      name: /subscribe for a 25% discount/i,
    });
    expect(newsletter).toBeInTheDocument();
  });

  it('Should render the footer successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('Should render the search component successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const search = screen.getByRole('searchbox');
    expect(search).toBeInTheDocument();
  });

  it('Should render the skip to main content link successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toBeInTheDocument();
  });

  it('Should render the scroll to top button successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    const scrollTop = screen.getByRole('button', { name: /scroll to top/i });
    expect(scrollTop).toBeInTheDocument();
  });

  it('Should render the toastify component successfully', () => {
    renderWithProviders(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    // eslint-disable-next-line testing-library/no-node-access
    const toastify = document.getElementsByClassName('Toastify');
    expect(toastify[0]).toBeInTheDocument();
  });
});
