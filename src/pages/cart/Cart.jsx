import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, getTotals } from './cartSlice';
import { toast } from 'react-toastify';
import styles from './Cart.module.scss';
import formatCurrency from '../../utils/formatCurrency.js';
import productUrl from '../../utils/productUrl';
import {
  MainContentContainer,
  CustomQtyInput,
  NoProductsFound,
} from '../../components';

const Cart = () => {
  const { cartItems, cartSubtotalPrice, cartTotalPrice, delivery } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncreaseQty = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(getTotals());
    toast.success(`${product.title} has been added to your cart`);
  };

  const handleDecreaseQty = (product) => {
    dispatch(removeFromCart(product));
    dispatch(getTotals());
    toast.success(`${product.title} has been removed from your cart`);
  };

  return (
    <MainContentContainer mainContentContainerClass={styles['cart__container']}>
      <h2 className={styles['cart__header']}>shopping cart</h2>

      {cartItems.length === 0 ? (
        <NoProductsFound message={'your cart is currently empty'} />
      ) : (
        <div className={`flex--row ${styles['cart__wrap']}`}>
          <div className={styles['table-wrap']}>
            <table>
              <thead className="capitalize">
                <tr>
                  <th></th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                </tr>
              </thead>

              <tbody>
                {cartItems?.map((item) => (
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
                      <CustomQtyInput
                        qtyInputId={item.id}
                        qtyInputValue={item.cartQty}
                        stepUp={() => handleIncreaseQty(item)}
                        stepDown={() => handleDecreaseQty(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className={styles['order-summary']}>
            <h3>cart total</h3>

            <ul className="capitalize">
              <li className="flex--row">
                <span>subtotal:</span>
                <span>{formatCurrency(cartSubtotalPrice)}</span>
              </li>

              <li className="flex--row">
                <span>delivery:</span>
                <span>
                  {delivery === 'free' ? delivery : formatCurrency(delivery)}
                </span>
              </li>

              <li className="flex--row">
                <span>total:</span>
                <span>{formatCurrency(cartTotalPrice)}</span>
              </li>
            </ul>

            <Link className="main--btn capitalize" to="/checkout">
              go to checkout
            </Link>
          </section>
        </div>
      )}
    </MainContentContainer>
  );
};

export default Cart;
