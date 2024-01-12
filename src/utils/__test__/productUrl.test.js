import productUrl from '../productUrl';

describe('productUrl function', () => {
  it('Should return the product URL with the given title and id', () => {
    const tested = productUrl('title', 'id');
    const expected = '/product/title/id=id';
    expect(tested).toEqual(expected);
  });

  it('Should return the product URL with the given title and id and replace the title spaces with dashes if the title is multi-word', () => {
    const tested = productUrl('multi word title', 'id');
    const expected = '/product/multi-word-title/id=id';
    expect(tested).toEqual(expected);
  });
});
