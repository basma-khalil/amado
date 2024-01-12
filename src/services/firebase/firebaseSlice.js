import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  startAfter,
  limit,
  endBefore,
  where,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const productsApiSlice = createApi({
  reducerPath: 'apiProducts',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    /* ************** All Products Fetching ************** */
    getAllProducts: builder.query({
      queryFn: async () => {
        try {
          const productsRef = collection(db, 'products');
          const q = query(productsRef, orderBy('date'));
          const querySnapshot = await getDocs(q);
          let products = [];
          querySnapshot?.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
          });
          products.forEach(
            (product) =>
              product.date &&
              (product.date = product.date.toDate().toDateString())
          );
          return { data: products };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ['Product'],
    }),

    /* ************** Single Product Fetching ************** */
    getSingleProduct: builder.query({
      queryFn: async (id) => {
        try {
          const productRef = doc(db, 'products', id);
          const docSnap = await getDoc(productRef);
          const product = {id: id, ...docSnap.data()};
          product.date = product.date.toDate().toDateString();
          return { data: product };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ['Product'],
    }),

    /* ************** Pagination & Filter Fetching ************** */
    getShopProducts: builder.query({
      queryFn: async ({
        category,
        brand,
        color,
        minPrice,
        maxPrice,
        sortBy,
        order,
        lastVisible,
        prodsPerPage,
      }) => {
        try {
          const cursorClause =
            order === 'asc'
              ? startAfter(lastVisible || 0)
              : endBefore(lastVisible || 0);

          const productsRef = collection(db, 'products');
          const q = query(
            productsRef,
            where('category', 'array-contains-any', category),
            where('brand', 'in', brand),
            where('color', 'in', color),
            where('price', '>=', minPrice), // FIX: firebase limitation
            where('price', '<=', maxPrice),
            orderBy(sortBy, order),
            cursorClause,
            limit(prodsPerPage)
          );

          const querySnapshot = await getDocs(q);
          let products = [];
          querySnapshot?.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
          });
          products.forEach(
            (product) =>
              product.date &&
              (product.date = product.date.toDate().toDateString())
          );
          return { data: products };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} = productsApiSlice;
