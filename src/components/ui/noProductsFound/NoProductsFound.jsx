import PropTypes from 'prop-types';
import img from '../../../assets/images/no-product.png';

const NoProductsFound = ({ message }) => {
  return (
    <div className="flex--col">
      <img src={img} alt="No Products Found" />
      <h2 style={{ margin: 0 }}>no products found</h2>
      {message && <p className="capital--first--letter">{message}</p>}
    </div>
  );
};

NoProductsFound.propTypes = {
  message: PropTypes.string,
};

export default NoProductsFound;
