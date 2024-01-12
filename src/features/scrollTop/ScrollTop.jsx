import styles from './ScrollTop.module.scss';
import { RiArrowUpSLine } from '../../lib';
import { useEffect, useState } from 'react';

const ScrollTop = () => {
  const [goTopBtn, setGoTopBtn] = useState(false);

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  useEffect(() => {
    let unmounted = false;
    const showGoTopBtn = () => {
      document.body.scrollTop > 300 || document.documentElement.scrollTop > 300
        ? setGoTopBtn(true)
        : setGoTopBtn(false);
    };
    !unmounted && window.addEventListener('scroll', showGoTopBtn);
    return () => {
      unmounted = true;
      window.removeEventListener('scroll', showGoTopBtn);
    };
  }, []);

  return (
    <button
      className={`${styles['go-top-btn']} flex--col reset--btn ${
        goTopBtn ? `${styles.show}` : ''
      }`}
      title="Scroll to top"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <RiArrowUpSLine size="25" />
    </button>
  );
};

export default ScrollTop;
