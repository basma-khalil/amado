import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetSingleProductQuery } from '../../services/firebase/firebaseSlice';
import { addToCart, getTotals } from '../cart/cartSlice';
import styles from './Product.module.scss';
import Error from '../error/Error';
import { Slider, Rating } from '../../lib';
import { MainContentContainer, CustomQtyInput } from '../../components';
import { Breadcrumbs, Loader } from '../../features';
import formatCurrency from '../../utils/formatCurrency';

const Product = () => {
  const [stars, setStars] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productImages = [];

  const productId = id.substring(3);

  const { data, isLoading, error } = useGetSingleProductQuery(productId);

  data &&
    Object.keys(data.image.details)
      ?.sort()
      .forEach((img) =>
        productImages.push({
          original: data.image.details[img],
          thumbnail: data.image.details[img],
          originalAlt: data.title,
          thumbnailAlt: data.title,
        })
      );

  const handleIncreaseQty = (quantity) => {
    quantity++;
    setQuantity(quantity);
  };

  const handleDecreaseQty = (quantity) => {
    quantity > 0 && quantity--;
    setQuantity(quantity);
  };

  const handleQtySubmit = (evt, product) => {
    evt.preventDefault();
    if (quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
      dispatch(getTotals());
      toast.success(`${product.title} has been added to your cart`);
    } else {
      toast.error('please select the product quantity');
    }
  };

  return (
    <>
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loader />
      ) : data ? (
        <MainContentContainer
          mainContentContainerClass={styles['product__container']}
        >
          <div className={styles['product__breadcrumb']}>
            <Breadcrumbs categories={data.category} />
          </div>

          <div className={`flex--row ${styles['product__wrap']}`}>
            <figure className={styles['product__slider']}>
              <Slider sliderImages={productImages} />
            </figure>

            <article className={styles['product__description']}>
              <header className="capitalize">
                <p className={`top-line ${styles['product__price']}`}>
                  {formatCurrency(data.price)}
                </p>

                <h1>{data.color + ' ' + data.title}</h1>

                <div className={`flex--row ${styles['product__rating']}`}>
                  <div className={styles.stars}>
                    <Rating
                      ratingStars={stars}
                      ratingSetStars={setStars}
                      ratingDisabled={false}
                    />
                  </div>
                  <Link className={styles.review} to="#">
                    write a review
                  </Link>
                </div>

                <p className={styles['product__availability']}>
                  <span
                    className={data.inStock > 0 ? '' : `${styles.unavailable}`}
                  ></span>
                  <span
                    className={data.inStock > 0 ? '' : `${styles.unavailable}`}
                  >
                    {data.inStock > 0 ? 'in stock' : 'out of stock'}
                  </span>
                </p>
              </header>

              <div className={styles['product__overview']}>
                <p>{data.description}</p>
              </div>

              <form onSubmit={(evt) => handleQtySubmit(evt, data)}>
                <CustomQtyInput
                  CustomQtyInputClass={styles['product__qty']}
                  qtyInputId={'product__qty'}
                  qtyInputValue={quantity}
                  stepUp={() => handleIncreaseQty(quantity)}
                  stepDown={() => handleDecreaseQty(quantity)}
                />
                <button
                  className="reset--btn main--btn capital--first--letter"
                  type="submit"
                  disabled={data.inStock === 0}
                >
                  add to cart
                </button>
              </form>
            </article>
          </div>
        </MainContentContainer>
      ) : null}
    </>
  );
};

export default Product;
