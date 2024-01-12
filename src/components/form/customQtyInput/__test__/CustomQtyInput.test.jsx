import { render, screen, fireEvent } from '@testing-library/react';
import CustomQtyInput from '../CustomQtyInput';

describe('CustomQtyInput component', () => {
  const stepDown = jest.fn();
  const stepUp = jest.fn();

  it('Should have the given class', () => {
    const { container } = render(
      <CustomQtyInput
        CustomQtyInputClass={'custom-qty-input-class'}
        qtyInputId={'qty-input-id'}
        qtyInputValue={0}
        stepUp={() => stepUp()}
        stepDown={() => stepDown()}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const customQtyInput = container.firstChild;
    expect(customQtyInput).toHaveClass('custom-qty-input-class');
  });

  it('Should have an input type number with the given id', () => {
    render(
      <CustomQtyInput
        CustomQtyInputClass={'custom-qty-input-class'}
        qtyInputId={'qty-input-id'}
        qtyInputValue={0}
        stepUp={() => stepUp()}
        stepDown={() => stepDown()}
      />
    );
    const quantityInput = screen.getByRole('spinbutton', { name: /qty/i });
    expect(quantityInput).toHaveAttribute('id', 'quantity-qty-input-id');
  });

  it('Should have an input type number with the given value', () => {
    render(
      <CustomQtyInput
        CustomQtyInputClass={'custom-qty-input-class'}
        qtyInputId={'qty-input-id'}
        qtyInputValue={0}
        stepUp={() => stepUp()}
        stepDown={() => stepDown()}
      />
    );
    const quantityInput = screen.getByRole('spinbutton', { name: /qty/i });
    expect(quantityInput).toHaveValue(0);
  });

  it('Should call the stepDown function when the decrease button is clicked', () => {
    render(
      <CustomQtyInput
        CustomQtyInputClass={'custom-qty-input-class'}
        qtyInputId={'qty-input-id'}
        qtyInputValue={0}
        stepUp={() => stepUp()}
        stepDown={() => stepDown()}
      />
    );
    const decreaseButton = screen.getByRole('button', { name: /decrease/i });
    fireEvent.click(decreaseButton);
    expect(stepDown).toHaveBeenCalledTimes(1);
  });

  it('Should call the stepUp function when the increase button is clicked', () => {
    render(
      <CustomQtyInput
        CustomQtyInputClass={'custom-qty-input-class'}
        qtyInputId={'qty-input-id'}
        qtyInputValue={0}
        stepUp={() => stepUp()}
        stepDown={() => stepDown()}
      />
    );
    const increaseButton = screen.getByRole('button', { name: /increase/i });
    fireEvent.click(increaseButton);
    expect(stepUp).toHaveBeenCalledTimes(1);
  });
});
