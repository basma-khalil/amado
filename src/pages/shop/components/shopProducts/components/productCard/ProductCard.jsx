import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.scss';
import { addToCart, getTotals } from '../../../../../cart/cartSlice';
import { toggleToFavorite } from '../../../../../favorite/favoriteSlice';
import {
  GiShoppingCart,
  FaRegHeart,
  FaHeart,
  Rating,
} from '../../../../../../lib';
import formatCurrency from '../../../../../../utils/formatCurrency';
import productUrl from '../../../../../../utils/productUrl';

const ProductCard = ({ view, product }) => {
  const { favoriteItems } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const {
    id,
    title,
    price,
    image: { overlay, sizes },
    rating,
    inStock,
  } = product;
  const isLiked = favoriteItems?.some((favItem) => favItem.id === id);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(getTotals());
    toast.success(`${product.title} has been added to your cart`);
  };

  const handleAddToFavorite = (product) => {
    dispatch(toggleToFavorite(product));
    isLiked
      ? toast.success(`${product.title} has been removed from your favorite`)
      : toast.success(`${product.title} has been added to your favorite`);
  };

  return (
    <article
      className={`${styles['product-card']} ${
        view === 'grid' ? `${styles.grid}` : `${styles.list}`
      }`}
    >
      <figure className={styles.thumbnail}>
        <Link to={productUrl(title, id)}>
          <img src={sizes['460X571']} alt={title} />
          <img className={styles['hover-img']} src={overlay} alt={title} />
        </Link>
      </figure>

      <header className={`flex--row`}>
        <div className={`flex--col ${styles.metadata}`}>
          <p className={`top-line ${styles.price}`}>{formatCurrency(price)}</p>
          <h4>
            <Link to={productUrl(title, id)}>{title}</Link>
          </h4>
        </div>

        <div className={`flex--col ${styles.tools}`}>
          <div className={styles.ratings}>
            <Rating ratingStars={rating} ratingDisabled={true} />
          </div>
          <div className="flex--row">
            <button
              className={`reset--btn has-tip ${styles.cart}`}
              type="button"
              aria-label="Add to Cart"
              onClick={() => handleAddToCart(product)}
              disabled={inStock === 0}
            >
              <GiShoppingCart size="26" />
              {inStock === 0
                ? <span className="tooltip">Out of Stock</span>
                : <span className="tooltip">Add to Cart</span>
              }
            </button>
            <button
              className={`reset--btn has-tip ${styles.heart}`}
              type="button"
              aria-label="Toggle Favorite"
              onClick={() => handleAddToFavorite(product)}
            >
              {isLiked ? (
                <>
                  <FaHeart className={styles['full-heart']} size="21" />
                  <span className="tooltip">Remove from Favorite</span>
                </>
              ) : (
                <>
                  <FaRegHeart size="21" />
                  <span className="tooltip">Add to Favorite</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>
    </article>
  );
};

ProductCard.propTypes = {
  view: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
