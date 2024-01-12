import styles from './CustomQtyInput.module.scss';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from '../../../lib';

const CustomQtyInput = ({
  CustomQtyInputClass,
  qtyInputId,
  qtyInputValue,
  stepUp,
  stepDown,
}) => {
  return (
    <div className={`${styles['qty-input']} ${CustomQtyInputClass || ''}`}>
      <label className="capitalize" htmlFor={`quantity-${qtyInputId}`}>
        qty
      </label>
      <button
        className={`reset--btn ${styles.decrease}`}
        type="button"
        aria-label="decrease"
        onClick={stepDown}
      >
        <FaMinus size="8" />
      </button>

      <input
        id={`quantity-${qtyInputId}`}
        type="number"
        name={`quantity-${qtyInputId}`}
        min="0"
        step="1"
        value={qtyInputValue}
        readOnly={true}
        required
      />

      <button
        className={`reset--btn ${styles.increase}`}
        type="button"
        aria-label="increase"
        onClick={stepUp}
      >
        <FaPlus size="8" />
      </button>
    </div>
  );
};

CustomQtyInput.propTypes = {
  qtyInputId: PropTypes.string.isRequired,
  qtyInputClass: PropTypes.string,
  qtyInputValue: PropTypes.number.isRequired,
  stepDown: PropTypes.func.isRequired,
  stepUp: PropTypes.func.isRequired,
};

export default CustomQtyInput;
