import { useState, useRef } from 'react';
import styles from './Newsletter.module.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const subscribeForm = useRef();

  const handleSubscribe = (evt) => {
    evt.preventDefault();
    subscribeForm.current.reset();
  };

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  return (
    <div className={styles.newsletter}>
      <div className="container flex--row">
        <section className={styles['newsletter__text']}>
          <h2 className="capital--first--letter">
            subscribe for a
            <span> 25% discount</span>
          </h2>
          <p>
            Nulla ac convallis lorem, eget euismod nisl. Donec in libero sit
            amet mi vulputate consectetur. Donec auctor interdum purus, ac
            finibus massa bibendum nec.
          </p>
        </section>

        <form
          className={styles['subscribe-form']}
          action=""
          name="subscribe"
          ref={subscribeForm}
          onSubmit={handleSubscribe}
        >
          <label className="sr--only" htmlFor="subscribe-email">
            Your E-mail
          </label>
          <input
            id="subscribe-email"
            type="email"
            name="email"
            placeholder="Your E-mail"
            autoComplete="email"
            value={email}
            onChange={handleEmail}
            required
          />
          <button className="reset--btn capitalize" type="submit">
            subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
