import StarsRating from 'react-star-rate';
import PropTypes from 'prop-types';

const Rating = ({ ratingStars, ratingSetStars, ratingDisabled }) => {
  return (
    <StarsRating
      value={ratingStars}
      onChange={ratingSetStars && ((value) => ratingSetStars(value))}
      disabled={ratingDisabled}
    />
  );
};

Rating.propTypes = {
  ratingStars: PropTypes.number.isRequired,
  ratingSetStars: PropTypes.func,
  ratingDisabled: PropTypes.bool.isRequired,
};

export default Rating;
