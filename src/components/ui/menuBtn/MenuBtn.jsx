import styles from './MenuBtn.module.scss';
import PropTypes from 'prop-types';
import { FiMenu } from '../../../lib';

const MenuBtn = ({
  menuBtnClass,
  menuBtnOnClick,
  menuBtnSize,
  menuBtnLabel,
  menuBtnControls,
  menuBtnState,
  menuBtnDisabled,
}) => {
  return (
    <button
      className={`reset--btn ${styles['menu-btn']} ${menuBtnClass || ''}`}
      type="button"
      aria-label={menuBtnLabel}
      aria-controls={menuBtnControls}
      aria-expanded={menuBtnState}
      onClick={menuBtnOnClick}
      disabled={menuBtnDisabled}
    >
      <FiMenu size={menuBtnSize} />
    </button>
  );
};

MenuBtn.propTypes = {
  menuBtnClass: PropTypes.string,
  menuBtnOnClick: PropTypes.func.isRequired,
  menuBtnSize: PropTypes.number.isRequired,
  menuBtnLabel: PropTypes.string.isRequired,
  menuBtnControls: PropTypes.string.isRequired,
  menuBtnState: PropTypes.bool.isRequired,
  menuBtnDisabled: PropTypes.bool,
};

export default MenuBtn;
