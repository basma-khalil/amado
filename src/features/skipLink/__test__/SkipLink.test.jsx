import { render, screen } from '@testing-library/react';
import SkipLink from '../SkipLink';

describe('SkipLink component', () => {
  it('Should go to the main content id', () => {
    render(<SkipLink />);
    const skipLink = screen.getByRole('link', {
      name: /Skip to main content/i,
    });
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
