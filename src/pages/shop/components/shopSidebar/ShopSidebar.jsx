import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ShopSidebar.module.scss';
import { MainContentContainer } from '../../../../components';
import { CustomRangeSlider } from '../../../../lib';

const ShopSidebar = ({ searchParams, setSearchParams }) => {
  const products = useSelector((state) => state.products.products);
  const maxPrice = Number(process.env.REACT_APP_MAX_PRICE);
  const minPrice = Number(process.env.REACT_APP_MIN_PRICE);

  const categories = [
    'all',
    'chairs',
    'beds',
    'accessories',
    'furniture',
    'home deco',
    'dressings',
    'tables',
  ];
  // const brands  = ['amado', 'ikea', 'furniture inc', 'the factory', 'artdeco'];
  const brands = [...new Set(products.map((product) => product.brand))];
  const colors = [
    'white',
    'gray',
    'black',
    'blue',
    'red',
    'yellow',
    'orange',
    'brown',
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [priceValues, setPriceValues] = useState([minPrice, maxPrice]);
  const searchQuery = searchParams.get('query');

  const handleSetCategory = (category) => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('category', category);
        searchParams.set('page', 1);
        return searchParams;
      },
      { replace: true }
    );
    setActiveCategory(category);
    window.scroll(0, 0);
  };

  const handleSetBrand = (evt) => {
    const brands = searchParams.getAll('brand');
    let deleteBrand, appendBrand;
    if (evt.target.checked) {
      deleteBrand = 'all';
      appendBrand = evt.target.value;
    } else {
      deleteBrand = evt.target.value;
      appendBrand = 'all';
    }
    setSearchParams(
      (searchParams) => {
        searchParams.delete('brand', deleteBrand);
        searchParams.append('brand', appendBrand);
        searchParams.set('page', 1);
        if (!evt.target.checked && brands.length > 1) {
          searchParams.delete('brand', appendBrand);
        }
        return searchParams;
      },
      { replace: true }
    );
    window.scroll(0, 0);
  };

  const handleSetColor = (evt) => {
    const colors = searchParams.getAll('color');
    let deleteColor, appendColor;
    if (evt.target.checked) {
      deleteColor = 'all';
      appendColor = evt.target.value;
    } else {
      deleteColor = evt.target.value;
      appendColor = 'all';
    }
    setSearchParams(
      (searchParams) => {
        searchParams.delete('color', deleteColor);
        searchParams.append('color', appendColor);
        searchParams.set('page', 1);
        if (!evt.target.checked && colors.length > 1) {
          searchParams.delete('color', appendColor);
        }
        return searchParams;
      },
      { replace: true }
    );
    window.scroll(0, 0);
  };

  useEffect(() => {
    let unmounted = false;
    let priceDebounce;
    const handleSetPrice = () => {
      setSearchParams(
        (searchParams) => {
          searchParams.set('minPrice', priceValues[0]);
          searchParams.set('maxPrice', priceValues[1]);
          return searchParams;
        },
        { replace: true }
      );
    };
    if (!unmounted) {
      priceDebounce = setTimeout(handleSetPrice, 1000);
      window.scroll(0, 0);
    }
    return () => {
      unmounted = true;
      clearTimeout(priceDebounce);
    };
  }, [setSearchParams, priceValues]);

  const handleResetSearch = () => {
    setSearchParams(
      (searchParams) => {
        searchParams.set('query', 'all');
        searchParams.set('page', 1);
        return searchParams;
      },
      { replace: true }
    );
    window.scroll(0, 0);
  };

  return (
    <MainContentContainer
      mainContentContainerClass={`capitalize ${styles['shop__sidebar']}`}
    >
      <section className={`${styles['shop__widget']} ${styles.catagories}`}>
        <h3>categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <button
                type="button"
                className={`reset--btn capitalize ${
                  activeCategory === category ? `${styles.active}` : ''
                }`}
                onClick={() => handleSetCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles['shop__widget']} ${styles.brands}`}>
        <h3>brands</h3>
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>
              <label htmlFor={brand.split(' ').join('-')}>
                <input
                  id={brand.split(' ').join('-')}
                  type="checkbox"
                  name={brand.split(' ').join('-')}
                  value={brand}
                  onChange={handleSetBrand}
                />
                <span>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles['shop__widget']} ${styles.colors}`}>
        <h3>color</h3>
        <ul>
          {colors.map((color, index) => (
            <li key={index}>
              <input
                id={color}
                className="sr--only"
                type="checkbox"
                name={color}
                value={color}
                onChange={handleSetColor}
              />
              <label htmlFor={color}>
                <span
                  className={`${styles.color} ${styles[color]}`}
                  aria-label={color}
                ></span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles['shop__widget']} ${styles.price}`}>
        <h3>price</h3>
        <CustomRangeSlider
          type={'price'}
          rangMin={minPrice}
          rangeMax={maxPrice}
          rangeValues={priceValues}
          setRangeValues={setPriceValues}
        />
        <p className={styles['range-values']}>
          {`$${priceValues[0]} - $${priceValues[1]}`}
        </p>
      </section>

      <section className={`${styles['shop__widget']} ${styles.price}`}>
        <button
          className="reset--btn minor--btn capitalize"
          onClick={handleResetSearch}
          disabled={searchQuery === 'all'}
        >
          clear search
        </button>
      </section>
    </MainContentContainer>
  );
};

ShopSidebar.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default ShopSidebar;
