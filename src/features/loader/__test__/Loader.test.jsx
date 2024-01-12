import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader component', () => {
  it('Should load successfully', () => {
    const loaderPortal = document.createElement('dive');
    loaderPortal.setAttribute('id', 'loader');
    document.body.appendChild(loaderPortal);

    render(<Loader />);

    const loader = screen.getByLabelText(/loading/i);
    expect(loader).toBeInTheDocument();
  });
});
