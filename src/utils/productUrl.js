const productUrl = (title, id) =>
  `/product/${title.split(' ').join('-')}/id=${id}`;

export default productUrl;
