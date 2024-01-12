import { render, screen, fireEvent } from '@testing-library/react';
import CloseBtn from '../CloseBtn';

describe('CloseBtn component', () => {
  const closeBtnOnClick = jest.fn();

  it('Should have the given label', () => {
    render(
      <CloseBtn
        closeBtnClass={'close-button-class'}
        closeBtnLabel={'close button label'}
        closeBtnOnClick={closeBtnOnClick}
      />
    );
    const closeButton = screen.getByRole('button', {
      name: /close button label/i,
    });
    expect(closeButton).toBeInTheDocument();
  });

  it('Should have the default label if no label is given', () => {
    render(
      <CloseBtn
        closeBtnClass={'close-button-class'}
        closeBtnOnClick={closeBtnOnClick}
      />
    );
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('Should have the given class', () => {
    render(
      <CloseBtn
        closeBtnClass={'close-button-class'}
        closeBtnOnClick={closeBtnOnClick}
      />
    );
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveClass('close-button-class');
  });

  it('Should call the closeBtnOnClick function when the close button is clicked', () => {
    render(
      <CloseBtn
        closeBtnClass={'close-button-class'}
        closeBtnOnClick={closeBtnOnClick}
      />
    );
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);
    expect(closeBtnOnClick).toHaveBeenCalledTimes(1);
  });
});
