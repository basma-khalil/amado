import PropTypes from 'prop-types';
import styles from './MainContentContainer.module.scss';

const MainContentContainer = ({ children, mainContentContainerClass }) => {
  return (
    <div
      className={`${styles['main-content']} ${mainContentContainerClass || ''}`}
    >
      {children}
    </div>
  );
};

MainContentContainer.propTypes = {
  children: PropTypes.node,
  mainContentContainerClass: PropTypes.string,
};

export default MainContentContainer;
