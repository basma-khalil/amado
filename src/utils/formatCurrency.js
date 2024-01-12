const formatCurrency = (price) => {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  });

  return currencyFormatter.format(price);
};

export default formatCurrency;
