import { render, screen, fireEvent } from '@testing-library/react';
import MenuBtn from '../MenuBtn';

describe('MenuBtn component', () => {
  const menuBtnOnClick = jest.fn();

  it('Should have the given label', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={false}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    expect(menuButton).toBeInTheDocument();
  });

  it('Should have the given class', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={false}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    expect(menuButton).toHaveClass('menu-button-class');
  });

  it('Should call the menuBtnOnClick function when the menu button is clicked', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={false}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    fireEvent.click(menuButton);
    expect(menuBtnOnClick).toHaveBeenCalledTimes(1);
  });

  it('Should have svg with the given width', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={false}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuButton.firstChild).toHaveAttribute('width', '50');
  });

  it('Should have the given aria-controls', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={false}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    expect(menuButton).toHaveAttribute('aria-controls', 'menu-button-controls');
  });

  it('Should have the given aria-expanded', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={false}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should be disabled', () => {
    render(
      <MenuBtn
        menuBtnLabel={'menu-button-label'}
        menuBtnClass={'menu-button-class'}
        menuBtnOnClick={menuBtnOnClick}
        menuBtnSize={50}
        menuBtnControls={'menu-button-controls'}
        menuBtnState={true}
        menuBtnDisabled={true}
      />
    );
    const menuButton = screen.getByRole('button', {
      name: /menu-button-label/i,
    });
    expect(menuButton).toBeDisabled();
  });
});
