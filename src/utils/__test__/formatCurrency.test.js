import formatCurrency from '../formatCurrency';

describe('formatCurrency function', () => {
  it('Should return the given price with formatted currency', () => {
    const tested = formatCurrency(100);
    const expected = '$100.00';
    expect(tested).toEqual(expected);
  });
});
