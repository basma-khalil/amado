import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { closeSidebar } from './sidebarSlice';
import { toggleSearch } from '../../../features/search/searchSlice';
import styles from './Sidebar.module.scss';
import { Logo, CloseBtn } from '../../index';
import * as icon from '../../../lib';
import shopUrlParams from '../../../utils/shopUrlParams';

const Sidebar = ({ searchBtn }) => {
  const openMenu     = useSelector((state) => state.sidebar.isOpen);
  const openSearch   = useSelector((state) => state.search.isOpen);
  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);
  const dispatch     = useDispatch();
  const socials      = [
    {
      title: 'Pinterest',
      url: 'https://www.pinterest.com',
      icon: icon.FaPinterest,
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com',
      icon: icon.FaInstagram,
    },
    {
      title: 'Facebook',
      url: 'https://www.facebook.com',
      icon: icon.FaFacebookF,
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com',
      icon: icon.FaTwitter,
    },
  ];

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleOpenSearch = () => {
    dispatch(toggleSearch());
    dispatch(closeSidebar());
  };

  return (
    <aside
      id="site-sidebar"
      className={`${styles['site-sidebar']} ${
        openMenu ? `${styles['open-sidebar']}` : ''
      }`}
      aria-live="polite"
    >
      <CloseBtn
        closeBtnClass={'nav-close'}
        closeBtnOnClick={handleCloseSidebar}
      />

      <h1 className={styles.logo}>
        <Link to="/" onClick={handleCloseSidebar}>
          <Logo
            logoLight={true}
            logoWidth={137}
            logoHeight={55}
            loadingLazy={false}
          />
        </Link>
      </h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/" onClick={handleCloseSidebar} end>
              home
            </NavLink>
          </li>
          <li>
            <NavLink to={shopUrlParams()} onClick={handleCloseSidebar}>
              shop
            </NavLink>
          </li>
          <li>
            <NavLink to="cart" onClick={handleCloseSidebar}>
              cart
            </NavLink>
          </li>
          <li>
            <NavLink to="checkout" onClick={handleCloseSidebar}>
              checkout
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="btn--group">
        <Link
          to="/discount"
          className="main--btn capitalize"
          onClick={handleCloseSidebar}
        >
          %discount%
        </Link>
        <Link
          to={shopUrlParams({ sorting: 'newest' })}
          className="minor--btn capital--first--letter"
          onClick={handleCloseSidebar}
        >
          new this week
        </Link>
      </div>

      <ul className={styles['user-tools']}>
        <li>
          <NavLink to="cart" onClick={handleCloseSidebar}>
            <icon.GiShoppingCart />
            cart
            <span>{` (${cartTotalQty})`}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="favorite" onClick={handleCloseSidebar}>
            <icon.FaRegStar />
            favorite
          </NavLink>
        </li>
        <li>
          <button
            ref={searchBtn}
            className={`reset--btn ${openSearch ? 'active' : ''}`}
            type="button"
            aria-controls="search-container"
            aria-expanded={openSearch ? 'true' : 'false'}
            onClick={handleOpenSearch}
          >
            <icon.GiMagnifyingGlass />
            search
          </button>
        </li>
      </ul>

      <ul className={`${styles.social} flex--row`}>
        {socials.map((social, index) => (
          <li key={index}>
            <a
              href={social.url}
              title={social.title}
              target="_blank"
              rel="noreferrer"
            >
              <social.icon />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  searchBtn: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Sidebar;
