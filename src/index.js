import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './root/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/index.scss';
import App from './root/App';
import RootLayout from './root/RootLayout';
import { Error } from './pages';
import { Loader } from './features';
import { checkoutAction } from './pages/checkout/Checkout';
import reportWebVitals from './reportWebVitals';

// Import routs
import { Home } from './pages';

const Shop     = lazy(() => import('./pages/shop/Shop'));
const Product  = lazy(() => import('./pages/product/Product'));
const Cart     = lazy(() => import('./pages/cart/Cart'));
const Checkout = lazy(() => import('./pages/checkout/Checkout'));
const Favorite = lazy(() => import('./pages/favorite/Favorite'));

// Routing
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <RootLayout>
        <Error />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: (
          <Suspense fallback={<Loader />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: 'product/:title/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<Loader />}>
            <Checkout />
          </Suspense>
        ),
        action: checkoutAction,
      },
      {
        path: 'favorite',
        element: (
          <Suspense fallback={<Loader />}>
            <Favorite />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
