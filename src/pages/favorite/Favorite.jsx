import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite } from './favoriteSlice';
import { addToCart, getTotals } from '../cart/cartSlice';
import { toast } from 'react-toastify';
import styles from './Favorite.module.scss';
import formatCurrency from '../../utils/formatCurrency.js';
import productUrl from '../../utils/productUrl';
import {
  MainContentContainer,
  CloseBtn,
  NoProductsFound,
} from '../../components';
import { GiShoppingCart } from '../../lib';

const Favorite = () => {
  const { favoriteItems } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        image: { sizes: { '166X166': product.imageUrl } },
      })
    );
    dispatch(getTotals());
    dispatch(removeFromFavorite(product));
    toast.success(`${product.title} has been added to your cart`);
  };

  const handleRemoveFromFavorite = (product) => {
    dispatch(removeFromFavorite(product));
    toast.success(`${product.title} has been removed from your favorite`);
  };

  return (
    <MainContentContainer mainContentContainerClass={styles['fav__container']}>
      <h2 className={styles['fav__header']}>saved items</h2>

      {favoriteItems.length === 0 ? (
        <NoProductsFound message={'your favorite is currently empty'} />
      ) : (
        <div className={styles['table-wrap']}>
          <table>
            <thead className="capitalize">
              <tr>
                <th></th>
                <th>name</th>
                <th>price</th>
                <th>add to cart</th>
                <th>remove</th>
              </tr>
            </thead>

            <tbody>
              {favoriteItems?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={productUrl(item.title, item.id)}>
                      <img src={item.imageUrl} alt={item.title} />
                    </Link>
                  </td>

                  <td>
                    <h4>{item.color + ' ' + item.title}</h4>
                  </td>

                  <td>
                    <span>{formatCurrency(item.price)}</span>
                  </td>

                  <td>
                    <button
                      className={`reset--btn has-tip ${styles.cart}`}
                      type="button"
                      aria-label="Add to Cart"
                      onClick={() => handleAddToCart(item)}
                      disabled={item.inStock === 0}
                    >
                      <GiShoppingCart size="26" />
                      {item.inStock === 0
                        ? <span className="tooltip">Out of Stock</span>
                        : <span className="tooltip">Add to Cart</span>
                      }
                    </button>
                  </td>

                  <td>
                    <CloseBtn
                      closeBtnClass={styles['delete-btn']}
                      closeBtnLabel={'delete'}
                      closeBtnOnClick={() => handleRemoveFromFavorite(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainContentContainer>
  );
};

export default Favorite;
