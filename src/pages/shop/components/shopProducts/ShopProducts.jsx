import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../../../../services/firebase/firebaseSlice';
import { storeProducts } from '../../../../root/store/commonSlices/productsSlice';
import PropTypes from 'prop-types';
import styles from './ShopProducts.module.scss';
import Error from '../../../error/Error';
import { MainContentContainer, NoProductsFound } from '../../../../components';
import { Loader, Pagination } from '../../../../features';
import { ProductCard, TabBar } from './components';

const ShopProducts = ({ searchParams, setSearchParams }) => {
  const [view, setView] = useState('grid');
  const [productsPerPage, setProductsPerPage] = useState(6);

  const allProducts = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const query    = searchParams.get('query');
  const category = searchParams.get('category');
  const brands   = searchParams.getAll('brand');
  const colors   = searchParams.getAll('color');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sorting  = searchParams.get('sorting');
  const page     = searchParams.get('page');

  const indexOfLastProduct  = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filterBySearch = (products, search) => {
    let searchProducts;
    search === 'all'
      ? (searchProducts = products)
      : (searchProducts = products.filter((product) =>
            product.title.includes(search) || product.category.includes(search)
        ));
    return searchProducts;
  };

  const filterByCategory = (products, category) => {
    let filteredProducts;
    category === 'all'
      ? (filteredProducts = products)
      : (filteredProducts = products.filter((product) =>
          product.category.includes(category)
        ));
    return filteredProducts;
  };

  const filterByBrand = (products, brands) => {
    let filteredProducts;
    brands.includes('all')
      ? (filteredProducts = products)
      : (filteredProducts = products.filter((product) =>
          brands.includes(product.brand)
        ));
    return filteredProducts;
  };

  const filterByColor = (products, colors) => {
    let filteredProducts;
    colors.includes('all')
      ? (filteredProducts = products)
      : (filteredProducts = products.filter((product) =>
          colors.includes(product.color)
        ));
    return filteredProducts;
  };

  const filterByPrice = (products, minPrice, maxPrice) => {
    return products?.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

  const sortBy = (products, sort) => {
    let sortedProducts;
    switch (sort) {
      case 'date':
        sortedProducts = products;
        break;
      case 'newest':
        sortedProducts = products.sort(
          (prod1, prod2) =>
            new Date(prod2.date).getTime() - new Date(prod1.date).getTime()
        );
        break;
      case 'price':
        sortedProducts = products.sort(
          (prod1, prod2) => prod1.price - prod2.price
        );
        break;
      case 'popular':
        sortedProducts = products.sort(
          (prod1, prod2) => prod2.rating - prod1.rating
        );
        break;
      default:
        sortedProducts = products;
    }
    return sortedProducts;
  };

  const paginationProducts = (products) => {
    return products?.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const getFinalProducts = () => {
    let currentProducts, message;
    currentProducts = allProducts;
    if (currentProducts.length === 0) {
      message = 'products are not available, please try again.';
      return { currentProducts, message };
    }
    currentProducts = filterBySearch(allProducts, query);
    if (currentProducts.length === 0) {
      message = 'your search did not match any products.';
      return { currentProducts, message };
    }
    currentProducts = filterByCategory(currentProducts, category);
    if (currentProducts.length === 0) {
      message = 'your category did not match any products.';
      return { currentProducts, message };
    }
    currentProducts = filterByBrand(currentProducts, brands);
    if (currentProducts.length === 0) {
      message = 'your brand did not match any products.';
      return { currentProducts, message };
    }
    currentProducts = filterByColor(currentProducts, colors);
    if (currentProducts.length === 0) {
      message = 'your color did not match any products.';
      return { currentProducts, message };
    }
    currentProducts = filterByPrice(currentProducts, minPrice, maxPrice);
    if (currentProducts.length === 0) {
      message = 'your price did not match any products.';
      return { currentProducts, message };
    }
    currentProducts = sortBy(currentProducts, sorting);
    return { currentProducts, message };
  };

  // Get all products
  const { data, error, isLoading } = useGetAllProductsQuery('bulbasaur');

  useEffect(() => {
    let unmounted = false;
    !unmounted && data && dispatch(storeProducts(data));
    return () => (unmounted = true);
  }, [data, dispatch]);

  // Apply filter
  const { currentProducts, message } = getFinalProducts();
  // Apply pagination
  const showingProducts = paginationProducts(currentProducts);

  return (
    <>
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loader />
      ) : data ? (
        <MainContentContainer
          mainContentContainerClass={styles['shop__products']}
        >
          <TabBar
            view={view}
            setView={setView}
            productsPerPage={productsPerPage}
            setProductsPerPage={setProductsPerPage}
            totalProducts={currentProducts.length}
            indexOfFirstProduct={indexOfFirstProduct + 1}
            indexOfLastProduct={indexOfFirstProduct + showingProducts.length}
            sortBy={sortBy}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          {query !== 'all' && <p>your search results for: {`"${query}"`}</p>}

          {currentProducts.length === 0 ? (
            <NoProductsFound message={message} />
          ) : (
            <div
              id="products-view"
              className={`${styles['products-wrap']} ${
                view === 'grid' ? `${styles.grid}` : ''
              }`}
            >
              {showingProducts?.map((product) => (
                <ProductCard key={product.id} view={view} product={product} />
              ))}
            </div>
          )}

          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={currentProducts.length}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </MainContentContainer>
      ) : null}
    </>
  );
};

ShopProducts.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default ShopProducts;
