import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';

describe('Breadcrumbs component', () => {
  it('Should have the given categories as breadcrumbs', () => {
    render(<Breadcrumbs categories={['category']} />, {
      wrapper: BrowserRouter,
    });
    const categoryBreadcrumb = screen.getByRole('link', { name: /category/i });
    expect(categoryBreadcrumb).toBeInTheDocument();
  });

  it('Should have the current page location as breadcrumbs', () => {
    const route = '/some-route';
    render(
      <MemoryRouter initialEntries={[route]}>
        <Breadcrumbs categories={['category']} />
      </MemoryRouter>
    );
    const routeBreadcrumb = screen.getByRole('link', { name: /some route/i });
    expect(routeBreadcrumb).toBeInTheDocument();
  });

  it('Should not have the id route as a breadcrumb', () => {
    const route = '/some-route/id=123';
    render(
      <MemoryRouter initialEntries={[route]}>
        <Breadcrumbs categories={['category']} />
      </MemoryRouter>
    );
    const crumbs = screen.getAllByRole('link');
    crumbs.map((crumb) => expect(crumb).not.toHaveTextContent(/id=123/i));
  });
});
