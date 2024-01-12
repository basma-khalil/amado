import { useSearchParams } from 'react-router-dom';
import styles from './Shop.module.scss';
import { ShopProducts, ShopSidebar } from './components';

const Shop = () => {
  const maxPrice = Number(process.env.REACT_APP_MAX_PRICE);
  const minPrice = Number(process.env.REACT_APP_MIN_PRICE);
  const [searchParams, setSearchParams] = useSearchParams({
    query   : 'all',
    category: 'all',
    brand   : ['all'],
    color   : ['all'],
    minPrice: minPrice,
    maxPrice: maxPrice,
    sorting : 'date',
    page    : 1,
  });

  return (
    <div className={styles['shop__container']}>
      <ShopProducts
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <ShopSidebar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default Shop;
