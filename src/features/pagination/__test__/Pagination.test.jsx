import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../Pagination';

describe('Pagination component', () => {
  const setSearchParams = jest.fn();
  const searchParams    = {
    get   : jest.fn(),
    getAll: jest.fn(),
  };

  it('Should have a pagination for the value of totalProducts/productsPerPage', () => {
    render(
      <BrowserRouter>
        <Pagination
          productsPerPage={5}
          totalProducts={20}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </BrowserRouter>
    );
    const pagination = screen.getAllByRole('link');
    expect(pagination).toHaveLength(4);
  });
});
