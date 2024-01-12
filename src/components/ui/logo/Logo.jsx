import PropTypes from 'prop-types';
import lightLogo from '../../../assets/images/logo.png';
import darkLogo from '../../../assets/images/logo2.png';

const Logo = ({ logoLight, logoWidth, logoHeight, loadingLazy }) => {
  return (
    <img
      src={logoLight ? lightLogo : darkLogo}
      alt="Amado"
      loading={loadingLazy ? 'lazy' : 'eager'}
      width={`${logoWidth}`}
      height={`${logoHeight}`}
    />
  );
};

Logo.propTypes = {
  logoLight: PropTypes.bool.isRequired,
  logoWidth: PropTypes.number.isRequired,
  logoHeight: PropTypes.number.isRequired,
  loadingLazy: PropTypes.bool.isRequired,
};

export default Logo;
