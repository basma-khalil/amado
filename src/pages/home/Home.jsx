import { useGetAllProductsQuery } from '../../services/firebase/firebaseSlice';
import styles from './Home.module.scss';
import Error from '../error/Error';
import ProductHome from './components/homeProduct/HomeProduct';
import { Loader } from '../../features';
import { NoProductsFound } from '../../components';

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery('bulbasaur');

  return (
    <>
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loader />
      ) : data.length === 0 ? (
        <NoProductsFound
          message={'products are not available, please try again.'}
        />
      ) : (
        <div className={styles['products-container']}>
          {data?.map((product) => {
            return <ProductHome key={product.id} product={product} />;
          })}
        </div>
      )}
    </>
  );
};

export default Home;
