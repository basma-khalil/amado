import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar, Newsletter, Footer, LinkSetup } from '../components';
import { Search, ScrollTop, SkipLink } from '../features';
import { ToastNotification } from '../lib';

function RootLayout({ children }) {
  const searchBtn = useRef();

  return (
    <>
      <LinkSetup />
      <SkipLink />
      <ToastNotification />
      <Search searchBtn={searchBtn} />

      <div className="site-wrap">
        <Header />
        <Sidebar searchBtn={searchBtn} />
        <main id="main-content" tabIndex={-1}>
          {children ? children : <Outlet />}
        </main>
        <Newsletter />
        <Footer />
      </div>

      <ScrollTop />
    </>
  );
}

export default RootLayout;
