import ReactSlider from 'react-slider';
import PropTypes from 'prop-types';
import styles from './CustomRangeSlider.module.scss';

const CustomRangeSlider = ({
  type,
  rangMin,
  rangeMax,
  rangeValues,
  setRangeValues,
}) => {
  return (
    <ReactSlider
      className={styles['range-slider']}
      thumbClassName={styles['range-slider__thumb']}
      ariaLabel={[`select minimum ${type}`, `select maximum ${type}`]}
      defaultValue={[rangMin, rangeMax]}
      min={rangMin}
      max={rangeMax}
      value={rangeValues}
      onChange={setRangeValues}
    />
  );
};

CustomRangeSlider.propTypes = {
  type: PropTypes.string.isRequired,
  rangMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  rangeValues: PropTypes.array.isRequired,
  setRangeValues: PropTypes.func.isRequired,
};

export default CustomRangeSlider;
