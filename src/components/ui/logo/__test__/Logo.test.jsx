import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo component', () => {
  it('Should have the light logo image', () => {
    render(
      <Logo
        logoLight={true}
        logoWidth={50}
        logoHeight={50}
        loadingLazy={true}
      />
    );
    const logo = screen.getByRole('img', { name: /amado/i });
    expect(logo.src).toContain('logo');
  });

  it('Should have the dark logo image', () => {
    render(
      <Logo
        logoLight={false}
        logoWidth={50}
        logoHeight={50}
        loadingLazy={true}
      />
    );
    const logo = screen.getByRole('img', { name: /amado/i });
    expect(logo.src).toContain('logo2');
  });

  it('Should have the given image width', () => {
    render(
      <Logo
        logoLight={true}
        logoWidth={50}
        logoHeight={50}
        loadingLazy={true}
      />
    );
    const logo = screen.getByRole('img', { name: /amado/i });
    expect(logo).toHaveAttribute('width', '50');
  });

  it('Should have the given image hight', () => {
    render(
      <Logo
        logoLight={true}
        logoWidth={50}
        logoHeight={50}
        loadingLazy={true}
      />
    );
    const logo = screen.getByRole('img', { name: /amado/i });
    expect(logo).toHaveAttribute('height', '50');
  });

  it('Should load lazily', () => {
    render(
      <Logo
        logoLight={true}
        logoWidth={50}
        logoHeight={50}
        loadingLazy={true}
      />
    );
    const logo = screen.getByRole('img', { name: /amado/i });
    expect(logo).toHaveAttribute('loading', 'lazy');
  });

  it('Should load eagerly', () => {
    render(
      <Logo
        logoLight={true}
        logoWidth={50}
        logoHeight={50}
        loadingLazy={false}
      />
    );
    const logo = screen.getByRole('img', { name: /amado/i });
    expect(logo).toHaveAttribute('loading', 'eager');
  });
});
