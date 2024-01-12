import { render, screen } from '@testing-library/react';
import MainContentContainer from '../MainContentContainer';

describe('MainContentContainer component', () => {
  it('Should render the MainContentContainer component children successfully', () => {
    render(
      <MainContentContainer>
        <h1>test</h1>
      </MainContentContainer>
    );
    const heading = screen.getByRole('heading', { name: /test/i });
    expect(heading).toBeInTheDocument();
  });
});
