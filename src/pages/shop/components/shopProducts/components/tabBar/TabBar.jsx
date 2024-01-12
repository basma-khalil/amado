import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TabBar.module.scss';
import { MenuBtn } from '../../../../../../components';
import { BiSolidGridAlt } from '../../../../../../lib';
import { CustomSelect } from '../../../../../../components';

const TabBar = ({
  view,
  setView,
  productsPerPage,
  setProductsPerPage,
  totalProducts,
  indexOfFirstProduct,
  indexOfLastProduct,
  sortBy,
  searchParams,
  setSearchParams,
}) => {
  const [openSorting, setOpenSorting] = useState(false);
  const [openProdsNum, setOpenProdsNum] = useState(false);

  const sorts        = ['date', 'newest', 'price', 'popular'];
  const prodsPerPage = [6, 12, 24, 48];
  const sorting      = searchParams.get('sorting');

  const toggleSortSelect = () => {
    setOpenSorting(!openSorting);
  };

  const handleSortBy = (evt) => {
    const sort = evt.target.value;
    sortBy(sort);
    setOpenSorting(false);
    setSearchParams(
      (searchParams) => {
        searchParams.set('sorting', sort);
        return searchParams;
      },
      { replace: true }
    );
  };

  const toggleProdsNumSelect = () => {
    setOpenProdsNum(!openProdsNum);
  };

  const handleProdsNum = (evt) => {
    const num = Number(evt.target.value);
    setProductsPerPage(num);
    setSearchParams(
      (searchParams) => {
        searchParams.set('page', 1);
        return searchParams;
      },
      { replace: true }
    );
    setOpenProdsNum(!openProdsNum);
  };

  return (
    <div className={`flex--row ${styles['products-tabbar']}`}>
      <p className={styles['total-products']}>
        {`showing ${
          totalProducts === 0 ? 0 : indexOfFirstProduct
        } - ${indexOfLastProduct} of ${totalProducts}`}
      </p>

      <div className={styles['products-view']}>
        <button
          className={`reset--btn ${styles['grid-btn']} ${
            view === 'grid' ? `${styles['active-view']}` : ''
          }`}
          type="button"
          aria-label="grid view"
          aria-controls="products-view"
          aria-expanded={view === 'grid'}
          onClick={() => setView('grid')}
          disabled={view === 'grid'}
        >
          <BiSolidGridAlt size={20} />
        </button>

        <MenuBtn
          menuBtnClass={`${styles['list-btn']} ${
            view === 'grid' ? '' : `${styles['active-view']}`
          }`}
          menuBtnSize={20}
          menuBtnLabel={'list view'}
          menuBtnControls={'products-view'}
          menuBtnState={view === 'list'}
          menuBtnOnClick={() => setView('list')}
          menuBtnDisabled={view === 'list'}
        />
      </div>

      <div className={styles['products-sorting']}>
        <CustomSelect
          label={'sort by'}
          options={sorts}
          comboboxId={'sort'}
          listboxId={'sorting-select'}
          openSelect={openSorting}
          setOpenSelect={toggleSortSelect}
          selectedOption={sorting}
          setSelectedOption={handleSortBy}
        />

        <CustomSelect
          label={'view'}
          options={prodsPerPage}
          comboboxId={'products-num'}
          listboxId={'products-num-select'}
          openSelect={openProdsNum}
          setOpenSelect={toggleProdsNumSelect}
          selectedOption={productsPerPage}
          setSelectedOption={handleProdsNum}
        />
      </div>
    </div>
  );
};

TabBar.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  productsPerPage: PropTypes.number.isRequired,
  setProductsPerPage: PropTypes.func.isRequired,
  totalProducts: PropTypes.number.isRequired,
  indexOfFirstProduct: PropTypes.number.isRequired,
  indexOfLastProduct: PropTypes.number.isRequired,
  sortBy: PropTypes.func.isRequired,
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default TabBar;
