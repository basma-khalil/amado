import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, redirect } from 'react-router-dom';
import styles from './Checkout.module.scss';
import { MainContentContainer } from '../../components';
import formatCurrency from '../../utils/formatCurrency';

const Checkout = () => {
  const checkoutForm = useRef();
  const { cartSubtotalPrice, cartTotalPrice, delivery } = useSelector(
    (state) => state.cart
  );

  const countries = [
    'united states',
    'united kingdom',
    'germany',
    'france',
    'india',
    'australia',
    'brazil',
    'canada',
  ];

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   checkoutForm.current.reset();
  // };

  return (
    <MainContentContainer
      mainContentContainerClass={styles['checkout__container']}
    >
      <h2>Checkout</h2>

      <Form
        className="flex--row"
        name="checkout"
        ref={checkoutForm}
        // onSubmit={handleSubmit}
        method="post"
      >
        <div className={styles['customer-details']}>
          <div className={styles['half--width']}>
            <div>
              <label className="sr--only" htmlFor="first-name">
                first name
              </label>
              <input
                id="first-name"
                type="text"
                name="first-name"
                placeholder="first name"
                autoComplete="given-name"
                required
              />
            </div>

            <div>
              <label className="sr--only" htmlFor="last-name">
                last name
              </label>
              <input
                id="last-name"
                type="text"
                name="last-name"
                placeholder="last name"
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div>
            <label className="sr--only" htmlFor="company-name">
              company name
            </label>
            <input
              id="company-name"
              type="text"
              name="company-name"
              placeholder="company name"
              autoComplete="organization"
            />
          </div>

          <div>
            <label className="sr--only" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="email"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles['select-wrap']}>
            <label className="sr--only" htmlFor="last-name">
              country
            </label>
            <select id="country" name="country" autoComplete="country" required>
              {/* <option value="default" disabled>country</option> */}
              {countries.map((country, indx) => (
                <option key={indx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="sr--only" htmlFor="address">
              address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="address"
              autoComplete="street-address"
              required
            />
          </div>

          <div>
            <label className="sr--only" htmlFor="town">
              town
            </label>
            <input
              id="town"
              type="text"
              name="town"
              placeholder="town"
              autoComplete="address-level2"
              required
            />
          </div>

          <div className={styles['half--width']}>
            <div>
              <label className="sr--only" htmlFor="zip-code">
                zip code
              </label>
              <input
                id="zip-code"
                type="number"
                name="zip-code"
                min="0"
                placeholder="zip code"
                autoComplete="postal-code"
                required
              />
            </div>

            <div>
              <label className="sr--only" htmlFor="phone">
                phone no
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="phone no"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div>
            <label className="sr--only" htmlFor="comment">
              leave a comment about your order
            </label>
            <textarea
              id="comment"
              className="capital--first--letter"
              name="comment"
              placeholder="leave a comment about your order"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div>
            <label htmlFor="create-account">
              <input
                id="create-account"
                type="checkbox"
                name="create-account"
              />
              <span className="capital--first--letter">create an account</span>
            </label>
          </div>

          <div>
            <label htmlFor="different-address">
              <input
                id="different-address"
                type="checkbox"
                name="different-address"
              />
              <span className="capital--first--letter">
                ship to a different address
              </span>
            </label>
          </div>
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
            <input
                type="number"
                name="total"
                min="0"
                value={cartTotalPrice}
                readOnly
                hidden
              />
              <span>total:</span>
              <span>{formatCurrency(cartTotalPrice)}</span>
            </li>

            <li>
              <label htmlFor="payment-cash">
                <input
                  id="payment-cash"
                  type="radio"
                  name="payment-method"
                  value="cash"
                  required
                />
                <span>cash on delivery</span>
              </label>
            </li>

            <li>
              <label htmlFor="payment-card">
                <input
                  id="payment-card"
                  type="radio"
                  name="payment-method"
                  value="card"
                />
                <span>
                  paypal
                  <img
                    src={require('../../assets/images/paypal.png')}
                    alt="Credit Card"
                  />
                </span>
              </label>
            </li>
          </ul>

          <button className="reset--btn main--btn capitalize" type="submit">
            checkout
          </button>
        </section>
      </Form>
    </MainContentContainer>
  );
};

export const checkoutAction = async ({ request }) => {
  try {
    const data = await request.formData();
    const submission = {
      firstName: data.get('first-name'),
      lastName: data.get('last-name'),
      companyName: data.get('company-name'),
      email: data.get('email'),
      country: data.get('country'),
      address: data.get('address'),
      town: data.get('town'),
      zipCode: data.get('zip-code'),
      phone: data.get('phone'),
      comment: data.get('comment'),
      createAccount: data.get('create-account'),
      differentAddress: data.get('different-address'),
      total: data.get('total'),
      paymentMethod: data.get('payment-method'),
    };
    // Send post request
    console.log(submission);
  } catch (err) {
    console.error(err);
  }
  return redirect('/');
};

export default Checkout;
