import { useRef } from 'react';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.scss';
import { RiArrowDownSLine } from '../../../lib';

const CustomSelect = ({
  customSelectClass,
  label,
  options,
  comboboxId,
  listboxId,
  openSelect,
  setOpenSelect,
  selectedOption,
  setSelectedOption,
}) => {
  const selectBtn = useRef();

  return (
    <div
      className={`capitalize ${styles['custom-select']} ${
        customSelectClass || ''
      }`}
    >
      <label htmlFor={comboboxId} className="capital--first--letter">
        <span>{label}</span>
        <input
          id={comboboxId}
          className="reset--btn capitalize"
          type="text"
          value={selectedOption}
          role="combobox"
          aria-controls="sorting-select"
          aria-expanded={openSelect}
          aria-activedescendant={selectedOption}
          aria-autocomplete="list"
          // onFocus={setOpenSelect}
          onClick={setOpenSelect}
          readOnly={true}
        />
      </label>

      <button
        ref={selectBtn}
        className={`reset--btn ${styles['select-btn']} ${
          openSelect ? `${styles['open-select']}` : ''
        }`}
        type="button"
        aria-label="open select options"
        aria-controls={listboxId}
        aria-expanded={openSelect}
        onClick={setOpenSelect}
      >
        <RiArrowDownSLine size={17} />
      </button>
      <FocusLock
        disabled={!openSelect}
        returnFocus={{ preventScroll: true }}
        onDeactivation={() => {
          window.setTimeout(() => selectBtn.current.focus(), 0);
        }}
      >
        <ul
          id={listboxId}
          className={`${styles['sorting-select']} ${
            openSelect ? `${styles['show-select']}` : ''
          }`}
          role="listbox"
          aria-live="polite"
        >
          {options.map((option, index) => (
            <li
              key={index}
              id={option}
              className={
                selectedOption === option ? `${styles['active-option']}` : ''
              }
              role="option"
              aria-selected={selectedOption === option}
            >
              <button
                className="reset--btn"
                type="button"
                value={option}
                onClick={setSelectedOption}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </FocusLock>
    </div>
  );
};

CustomSelect.propTypes = {
  customSelectClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  comboboxId: PropTypes.string.isRequired,
  listboxId: PropTypes.string.isRequired,
  openSelect: PropTypes.bool.isRequired,
  setOpenSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default CustomSelect;
