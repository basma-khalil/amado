import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={`flex--col ${styles['loader-wrapper']}`}>
      <div className={`${styles.loader} flex--row`} aria-label="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export default Loader;
