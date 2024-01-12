import { render, screen } from '@testing-library/react';
import TabBar from '../TabBar';
import styles from '../TabBar.module.scss';
import MenuBtn from '../../../../../../../components/ui/menuBtn/MenuBtn.jsx';

jest.mock('../../../../../../../components/ui/menuBtn/MenuBtn.jsx');

describe('TabBar component', () => {
  const setView = jest.fn();
  const setProductsPerPage = jest.fn();
  const sortBy = jest.fn();
  const setSearchParams = jest.fn();
  let searchParams;
  // For Jest console error
  beforeEach(() => {
    searchParams = {
      get: jest.fn().mockImplementation((key) => {
        switch (key) {
          case 'sorting':
            return 'date';
          default:
            return null;
        }
      }),
    };
  });

  it('Should display the showing products number', () => {
    render(
      <TabBar
        view={'grid'}
        setView={setView}
        productsPerPage={6}
        setProductsPerPage={setProductsPerPage}
        totalProducts={6}
        indexOfFirstProduct={1}
        indexOfLastProduct={6}
        sortBy={sortBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    );
    const showingMessage = screen.getByText(/showing 1 - 6 of 6/i);
    expect(showingMessage).toBeInTheDocument();
  });

  it('Should have the active-view class for the grid button', () => {
    render(
      <TabBar
        view={'grid'}
        setView={setView}
        productsPerPage={6}
        setProductsPerPage={setProductsPerPage}
        totalProducts={6}
        indexOfFirstProduct={1}
        indexOfLastProduct={6}
        sortBy={sortBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    );
    const gridButton = screen.getByRole('button', { name: /grid view/i });
    expect(gridButton).toHaveClass('active-view');
  });

  it('Should call the "MenuBtn" component with the given props', () => {
    // const menuBtnSpy = jest.spyOn(MenuBtn, 'default');

    render(
      <TabBar
        view={'grid'}
        setView={setView}
        productsPerPage={6}
        setProductsPerPage={setProductsPerPage}
        totalProducts={6}
        indexOfFirstProduct={1}
        indexOfLastProduct={6}
        sortBy={sortBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    );
    expect(MenuBtn).toHaveBeenNthCalledWith(
      1,
      {
        menuBtnClass: `${styles['list-btn']} `,
        menuBtnSize: 20,
        menuBtnLabel: 'list view',
        menuBtnControls: 'products-view',
        menuBtnState: false,
        menuBtnOnClick: expect.any(Function),
        menuBtnDisabled: false,
      },
      {}
    );
  });
});
