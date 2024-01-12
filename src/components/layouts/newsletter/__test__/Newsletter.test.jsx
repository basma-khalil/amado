import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from '../Newsletter';

describe('Newsletter component', () => {
  it('Should change the subscribe form email input value when the user types', async () => {
    const user = userEvent.setup();

    render(<Newsletter />);
    const subscribeEmailInput = screen.getByRole('textbox', {
      name: /Your E-mail/i,
    });
    await user.type(subscribeEmailInput, 'test@test.com');
    expect(subscribeEmailInput).toHaveValue('test@test.com');
  });
});
