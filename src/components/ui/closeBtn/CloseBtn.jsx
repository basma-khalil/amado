import styles from './CloseBtn.module.scss';
import PropTypes from 'prop-types';
import { IoIosClose } from '../../../lib';

const CloseBtn = ({ closeBtnClass, closeBtnLabel, closeBtnOnClick }) => {
  return (
    <button
      className={`reset--btn flex--col ${styles['close-btn']} ${
        closeBtnClass || ''
      }`}
      type="button"
      aria-label={closeBtnLabel || 'close menu'}
      onClick={closeBtnOnClick}
    >
      <IoIosClose size={30} />
    </button>
  );
};

CloseBtn.propTypes = {
  closeBtnClass: PropTypes.string,
  closeBtnLabel: PropTypes.string,
  closeBtnOnClick: PropTypes.func.isRequired,
};

export default CloseBtn;
