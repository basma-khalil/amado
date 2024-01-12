import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './HomeProduct.module.scss';
import formatCurrency from '../../../../utils/formatCurrency';
import productUrl from '../../../../utils/productUrl';

const ProductHome = ({ product }) => {
  const {
    id,
    title,
    price,
    image: { original },
  } = product;

  return (
    <div className={styles['home__product']}>
      <Link to={productUrl(title, id)}>
        <img src={original} alt={title} />

        <div className={styles.overlay}>
          <div className={`flex--col top-line ${styles['overlay__text']}`}>
            <span>{`from ${formatCurrency(price)}`}</span>
            <h2>{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductHome.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductHome;
