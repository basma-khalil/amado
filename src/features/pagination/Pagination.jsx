import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Pagination.module.scss';
import shopUrlParams from '../../utils/shopUrlParams.js';

const Pagination = ({
  productsPerPage,
  totalProducts,
  searchParams,
  setSearchParams,
}) => {
  const totalPageNumbers = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers      = [];

  for (let i = 1; i <= totalPageNumbers; i++) {
    pageNumbers.push(i);
  }

  const query    = searchParams.get('query');
  const category = searchParams.get('category');
  const brands   = searchParams.getAll('brand');
  const colors   = searchParams.getAll('color');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sorting  = searchParams.get('sorting');
  const page     = searchParams.get('page');

  const paginate = (pageNumber) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('page', pageNumber);
        return searchParams;
      },
      { replace: true }
    );
    window.scroll(0, 0);
  };

  return (
    <nav
      className={styles.pagination}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className={styles['page-num']}>
            <Link
              to={shopUrlParams({
                query,
                category,
                brands,
                colors,
                minPrice,
                maxPrice,
                sorting,
                page: number
              })}
              className={Number(page) === number ? `${styles.active}` : ''}
              aria-label={
                Number(page) === number
                  ? `Current Page, Page ${number}`
                  : `Go to Page ${number}`
              }
              onClick={() => paginate(number)}
            >
              {number
                .toString()
                .padStart(totalPageNumbers.toString().length, '0') + '.'}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default Pagination;
