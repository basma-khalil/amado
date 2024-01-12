import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.module.scss';
import shopUrlParams from '../../utils/shopUrlParams';

const Breadcrumbs = ({ categories }) => {
  const location  = useLocation();
  const excludes  = ['product', 'id'];
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter(
      (crumb) =>
        crumb !== '' && !excludes.some((exclude) => crumb.includes(exclude))
    );

  return (
    <ol className={`flex--row ${styles.breadcrumbs}`}>
      <li className={styles.crumb}>
        <Link to="/">home</Link>
      </li>

      {/* Breadcrumbs particular case with categories for this project */}
      {categories.map((category, index) => (
        <li key={index} className={styles.crumb}>
          <Link
            to={shopUrlParams({ category })}
          >
            {category}
          </Link>
        </li>
      ))}

      {/* Essential breadcrumbs with the current page location */}
      {crumbs.map((crumb) => {
        currentLink += `/${crumb}`;

        return (
          <li key={location.key} className={styles.crumb}>
            <Link to={currentLink}>{crumb.split('-').join(' ')}</Link>
          </li>
        );
      })}
    </ol>
  );
};

Breadcrumbs.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Breadcrumbs;
