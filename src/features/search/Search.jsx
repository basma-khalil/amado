import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CloseBtn } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import FocusLock from 'react-focus-lock';
import { closeSearch, setQuery } from './searchSlice';
import styles from './Search.module.scss';
import { GiMagnifyingGlass } from '../../lib';
import shopUrlParams from '../../utils/shopUrlParams';

const Search = ({ searchBtn }) => {
  const openSearch = useSelector((state) => state.search.isOpen);
  const query      = useSelector((state) => state.search.query);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const updateQuery = (evt) => {
    const query = evt.target.value;
    dispatch(setQuery(query.trim().toLowerCase()));
  };

  const handleSearchSubmit = (evt) => {
    let queryParam;
    query === '' ? (queryParam = 'all') : (queryParam = query);
    evt.preventDefault();
    dispatch(closeSearch());
    navigate(shopUrlParams({ query: queryParam }));
    dispatch(setQuery(''));
  };

  const handleCloseSearch = () => {
    dispatch(closeSearch());
  };

  return (
    <FocusLock
      disabled={!openSearch}
      returnFocus={{ preventScroll: true }}
      onDeactivation={() => {
        window.setTimeout(() => searchBtn.current.focus(), 0);
      }}
    >
      <div
        id="search-container"
        className={`flex--col ${styles['search-wrap']} ${
          openSearch ? `${styles['open-search']}` : ''
        }`}
        aria-live="polite"
        data-testid="search container"
      >
        <CloseBtn
          closeBtnClass={`${styles['search-close']}`}
          closeBtnOnClick={handleCloseSearch}
        />

        <div className="container">
          <form
            className={styles['search-form']}
            action=""
            onSubmit={handleSearchSubmit}
          >
            <button className="reset--btn" type="submit" aria-label="search">
              <GiMagnifyingGlass size="25" />
            </button>

            <label className="sr--only" htmlFor="search">
              Type your keyword
            </label>

            <input
              id="search"
              type="search"
              name="search"
              placeholder="Type your keyword..."
              autoComplete="search"
              autoFocus
              value={query}
              onChange={updateQuery}
            />
          </form>
        </div>
      </div>
    </FocusLock>
  );
};

Search.propTypes = {
  searchBtn: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Search;
